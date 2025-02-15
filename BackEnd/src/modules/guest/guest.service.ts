import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest, GuestDocument } from 'src/schemas/guest.schema';


@Injectable()
export class GuestService {
  constructor(@InjectModel(Guest.name) private guestModel: Model<GuestDocument>) {}

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    const newGuest = new this.guestModel(createGuestDto);
    return newGuest.save();
  }

  async findAll(options: { page: number; limit: number; search: string }) {
    const { page, limit, search } = options;
    let query: any = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search on 'name'
    }
    const total = await this.guestModel.countDocuments(query).exec();

    if (total === 0) {
      throw new NotFoundException({
        errorCode: 'NO_RECORD_FOUND',
        remarks: 'NO_RECORD_FOUND',
        exceptions: null,
        errors: null,
        msg: `No Record found`,
        data: [],
      });
    }
    let dataQuery = this.guestModel
        .find(query)
        .select(
          'firstName middleName lastName phone email location createdAt afFormGenerated',
        )
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .skip((page - 1) * limit) // Skip documents for previous pages
        .limit(limit); // Limit the results to the given page size

      // Execute the query to get data
      const data = await dataQuery.exec();
      return {
        success: true,
        data,
        total,
        page,
        limit,
        msg: 'Guests fetched successfully',
        remarks: 'RESPONSE_SUCCESSFUL',
      };
  }

  async findOne(id: string): Promise<Guest> {
    return this.guestModel.findById(id).exec();
  }

  async update(id: string, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    return this.guestModel.findByIdAndUpdate(id, updateGuestDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Guest> {
    return this.guestModel.findByIdAndDelete(id).exec();
  }
}

