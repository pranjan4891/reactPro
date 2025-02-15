import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

// Database & Logger
import { DatabaseModule } from './Mongoose/db.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

// Authentication & Modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { VenueModule } from './modules/master/venue/venue.module';
import { LocationModule } from './modules/master/location/location.module';
import { PropertyModule } from './modules/master/property/property.module';
import { PlanModule } from './modules/plan/plan.module';
import { OffersModule } from './modules/master/offers/offers.module';
import { GuestModule } from './modules/guest/guest.module';
import { MyTestModule } from './modules/my-test/my-test.module';
import { AfformModule } from './modules/afform/afform.module';
import { UploadModule } from './upload/upload.module';
import { VoucherModule } from './modules/voucher/voucher.module';

// ✅ Razorpay Module Added
import { RazorpayModule } from './payments/razorpay.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UserModule,
    EmployeeModule,
    VenueModule,
    LocationModule,
    PropertyModule,
    PlanModule,
    OffersModule,
    GuestModule,
    MyTestModule,
    AfformModule,
    UploadModule,
    VoucherModule,
    RazorpayModule, // ✅ Added RazorpayModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply to all routes
  }
}
