// import { Module } from '@nestjs/common';
// import { PlanService } from './plan.service';
// import { PlanController } from './plan.controller';

// @Module({
//   controllers: [PlanController],
//   providers: [PlanService],
// })
// export class PlanModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan, PlanSchema } from '../../schemas/plan.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]), // Register the schema
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService], // Export the service if needed in other modules
})
export class PlanModule {}
