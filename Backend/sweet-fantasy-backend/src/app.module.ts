import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BookingModule],
})
export class AppModule {}