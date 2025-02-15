import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan, PlanDocument } from 'src/schemas/plan.schema';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}


  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
      const newPlan = new this.planModel(createPlanDto);
      return newPlan.save();
    }

  // create(createPlanDto: CreatePlanDto) {
  //   return 'This action adds a new plan';
  // }

    async findAll(
      page = 1, // Default page is 1
      limit = 10, // Default limit is 10 items per page
      search = '', // Optional search query
    ): Promise<{
      data: Plan[];
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
        const total = await this.planModel.countDocuments(query).exec();
  
        // Fetch paginated data with related fields populated
        const data = await this.planModel
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
        console.error('Error fetching Plans:', error.message);
        throw new Error('Failed to fetch Plans');
      }
  
    }

  // findAll() {
  //   return `This action returns all plan`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
