// import { Module } from '@nestjs/common';
// import { AfformService } from './afform.service';
// import { AfformController } from './afform.controller';

// @Module({
//   controllers: [AfformController],
//   providers: [AfformService],
// })
// export class AfformModule {}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { AfformService } from './afform.service';
import { AfformController } from './afform.controller';
import { Afform, AfformSchema } from '../../schemas/afform.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Afform.name, schema: AfformSchema }]), // Register the schema
  ],
  controllers: [AfformController],
  providers: [AfformService],
  exports: [AfformService], // Export the service if needed in other modules
})
export class AfformModule {}
