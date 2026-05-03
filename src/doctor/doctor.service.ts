import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}
  async create(createDoctorDto: CreateDoctorDto) {
    return await this.prisma.doctor.create({
      data: {
        specialty: createDoctorDto.specialty,
        licenceNumber: createDoctorDto.licenceNumber,
        description: createDoctorDto.description,
        profile: {
          connect: {
            id: createDoctorDto.profile_id,
          },
        },
      },
    });
  }

  async findAll(specialty?: string) {
    if (!specialty)
      return await this.prisma.doctor.findMany({
        include: {
          profile: true,
          appointments: true,
          schedules: true,
        },
      });

    return await this.prisma.doctor.findMany({
      include: {
        profile: true,
        appointments: true,
        schedules: true,
      },
      where: {
        specialty,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.doctor.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        appointments: true,
        schedules: true,
      },
    });
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    return await this.prisma.doctor.update({
      where: {
        id,
      },
      data: {
        specialty: updateDoctorDto.specialty,
        description: updateDoctorDto.description,
        profile: {
          connect: {
            id: updateDoctorDto.profile_id,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.doctor.delete({
      where: {
        id,
      },
    });
  }
}
