import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venue } from 'src/schemas/venue.schema';


@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue.name) private venueModel: Model<Venue>) {}

  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    const createdVenue = new this.venueModel(createVenueDto);
    console.log('createVenueDto=====>',createVenueDto);
    
    return createdVenue.save();
  }

  async findAll(
    page = 1, // Default page is 1
    limit = 10, // Default limit is 10 items per page
    search = '', // Optional search query
  ): Promise<{
    data: Venue[];
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
      const total = await this.venueModel.countDocuments(query).exec();

      // Fetch paginated data with related fields populated
      const data = await this.venueModel
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

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    try {
      const updatedVenue = await this.venueModel.findByIdAndUpdate(id, updateVenueDto, {
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
    return `This action removes a #${id} venue`;
  }
}
