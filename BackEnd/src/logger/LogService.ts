import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../schemas/logs.schema';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(logData: Partial<Log>) {
    const createdLog = new this.logModel(logData);
    try {
      return await createdLog.save();
    } catch (error) {
      console.error('Error saving log to the database', error);
      throw new Error('Failed to save log');
    }
  }
}
