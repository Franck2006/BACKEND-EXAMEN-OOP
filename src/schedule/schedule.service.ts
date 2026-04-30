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

  async findOne(id: string) {
    return await this.prisma.schedule.findUnique({
      where:{
        id
      }
    })
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return await this.prisma.schedule.update({
      where:{
        id
      },
      data: updateScheduleDto,
    })
  }

  async remove(id: string) {
    return await this.prisma.schedule.delete({
      where:{
        id
      }
    })
  }
}
