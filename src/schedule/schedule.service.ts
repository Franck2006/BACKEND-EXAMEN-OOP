import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService){}
  async create(createScheduleDto: CreateScheduleDto) {
    return await this.prisma.schedule.create({
      data:{
        available_date: createScheduleDto.available_date,
        start_time: createScheduleDto.start_time,
        end_time: createScheduleDto.end_time,
        appointments:{
          connect:{
            id: createScheduleDto.appointment_id
          }
        },
        doctor:{
          connect:{
            id: createScheduleDto.doctor_id
          }
        }
      }
    })
  }

  async findAll() {
    return await this.prisma.schedule.findMany({
      include:{
        doctor: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
