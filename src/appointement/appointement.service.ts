import { Injectable } from '@nestjs/common';
import { CreateAppointementDto } from './dto/create-appointement.dto';
import { UpdateAppointementDto } from './dto/update-appointement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointementService {
  constructor(private prisma: PrismaService){}
  async create(createAppointementDto: CreateAppointementDto) {
    return this.prisma.appointment.create({
      data:{
        patient:{
          connect:{
            id: createAppointementDto.patient_id
          }
        },
        doctor:{
          connect:{
            id: createAppointementDto.doctor_id
          }
        },
        schedule:{
          connect:{
            id: createAppointementDto.schedule_id
          }
        }
      }
    })
  }

  async findAll() {
    return await this.prisma.appointment.findMany({
      include:{
        patient: true,
        schedule: true,
        doctor: true
      }
    })
  }

  async findOne(id: string) {
    return  await this.prisma.appointment.findUnique({
      where:{
        id
      }
    })
  }

  async update(id: string, updateAppointementDto: UpdateAppointementDto) {
    return await this.prisma.appointment.update({
      where:{
        id
      },
      data: {}
    })
  }

  async remove(id: string) {
    return  await this.prisma.appointment.delete({
      where:{
        id
      }
    })
  }
}
