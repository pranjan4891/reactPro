import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from 'src/schemas/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private EmployeeModel: Model<Location>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee =   new this.EmployeeModel(createEmployeeDto)
      const saveData = await newEmployee.save();
      return saveData
    } catch (error) {
      console.error('Error creating location:', error);
      if (error.code === 11000) {
        // Extract the duplicate key and value dynamically
        const duplicateField = Object.keys(error.keyValue)[0];
        const duplicateValue = error.keyValue[duplicateField];
        throw new ConflictException(
         { msg:`The ${duplicateField} "${duplicateValue}" is already in use.`,}
        );
      }else{

        // Re-throw other errors with a custom message
        throw new InternalServerErrorException({
          msg: error.message,
          originalError: error.message,
        });
      }
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
      const total = await this.EmployeeModel.countDocuments(query).exec();

      // Fetch paginated data with related fields populated
      const data = await this.EmployeeModel
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
    return `This action returns a #${id} employee`;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Location> {
    try {
      const updatedVenue = await this.EmployeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
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
    return `This action removes a #${id} employee`;
  }
}
