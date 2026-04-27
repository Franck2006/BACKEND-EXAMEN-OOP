import { Module } from '@nestjs/common';
import { AppointementService } from './appointement.service';
import { AppointementController } from './appointement.controller';

@Module({
  controllers: [AppointementController],
  providers: [AppointementService],
})
export class AppointementModule {}
