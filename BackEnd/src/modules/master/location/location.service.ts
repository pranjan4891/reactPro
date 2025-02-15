import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../../../schemas/location.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      const newLocation = new this.locationModel(createLocationDto);
      const savedData = await newLocation.save();
      return savedData;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  }


  async findAll(
    page = 1, // Default page is 1
    limit = 10, // Default limit is 10 items per page
    search = '', // Optional search query
  ): Promise<{
    data: Location[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      // Build query with optional search
      const query = search
        ? { name: { $regex: search, $options: 'i' } } // Case-insensitive search on name
        : {};

      // Get total number of matching documents
      const total = await this.locationModel.countDocuments(query).exec();

      // Fetch paginated data with related fields populated
      const data = await this.locationModel
        .find(query)
        .skip((page - 1) * limit) // Skip documents for previous pages
        .limit(limit) // Limit the results to the given page size
        .exec();

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (error) {
      // Handle errors gracefully and log them
      console.error('Error fetching Courier partners:', error.message);
      throw new Error('Failed to fetch Courier partners');
    }
  }

  async findOne(id: number) {
    // return `This action returns a #${id} location`;
    try {
      const company = await this.locationModel
        .findById(id)
        .populate('userId')
        .exec(); // Populate user information
      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      return company;
    } catch (error) {
      // this.Logg.error(
      //   `Error fetching company with ID ${id}: ${error.message}`,
      // );
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }
  

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    try {
      const updatedVenue = await this.locationModel.findByIdAndUpdate(id, updateLocationDto, {
        new: true, // Return the updated document
      });

      if (!updatedVenue) {
        throw new NotFoundException(`Venue with ID ${id} not found`);
      }

      return updatedVenue;
    } catch (error) {
      // Log error if necessary
      throw new InternalServerErrorException('Failed to update venue');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
