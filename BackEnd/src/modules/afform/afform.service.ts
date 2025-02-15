import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAfformDto } from './dto/create-afform.dto';
import { UpdateAfformDto } from './dto/update-afform.dto';
import { Afform, AfformDocument } from 'src/schemas/afform.schema';

@Injectable()
export class AfformService {
  constructor(@InjectModel(Afform.name) private afformModel: Model<AfformDocument>) {}


  async create(createAfformtDto: CreateAfformDto): Promise<Afform> {
      const newAfform = new this.afformModel(createAfformtDto);
      return newAfform.save();
    }
  // create(createAfformDto: CreateAfformDto) {
  //   return 'This action adds a new afform';
  // }


  // async findAll(): Promise<Afform[]> {
  //     return this.afformModel.find().exec();
  //   }

  async findAll(
    page = 1, // Default page is 1
    limit = 10, // Default limit is 10 items per page
    search = '', // Optional search query
  ): Promise<{
    data: Afform[];
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
      const total = await this.afformModel.countDocuments(query).exec();

      // Fetch paginated data with related fields populated
      const data = await this.afformModel
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

  // findAll() {
  //   return `This action returns all afform`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} afform`;
  // }

  async findOne(id: string): Promise<Afform> {
    try {
      const afform = await this.afformModel.findById(id).lean().exec(); // Adding .lean()
      if (!afform) {
        throw new Error('Afform not found');
      }
      return afform;
    } catch (error) {
      console.error(`Error fetching Afform with id ${id}:`, error.message);
      throw new Error('Failed to fetch Afform');
    }
  }
  

  update(id: number, updateAfformDto: UpdateAfformDto) {
    return `This action updates a #${id} afform`;
  }

  remove(id: number) {
    return `This action removes a #${id} afform`;
  }
}
