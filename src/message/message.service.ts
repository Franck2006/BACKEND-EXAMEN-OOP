import { Injectable } from '@nestjs/common';
import {
  CreateMessageDto,
  Doctor_patient_message,
} from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.message.create({
      data: {
        message: createMessageDto.message,
        patient: {
          connect: {
            id: createMessageDto.patient_id,
          },
        },
        doctor: {
          connect: {
            id: createMessageDto.doctor_id,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.message.findMany({
      include: {
        doctor: true,
        patient: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.message.findUnique({
      where: {
        id,
      },
    });
  }

  async getOneMessageForDoctor(id: string) {
    return await this.prisma.message.findMany({
      where: {
        doctorId: id,
      },
      include: {
        patient: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async getOneMessageForDoctorPatient(
    doctor_patient_message: Doctor_patient_message,
  ) {
    return await this.prisma.message.findMany({
      where: {
        doctorId: doctor_patient_message.patient_id,
        patientId: doctor_patient_message.patient_id,
      },
    });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return await this.prisma.message.update({
      where: {
        id,
      },
      data: {
        message: updateMessageDto.message,
        patient: {
          connect: {
            id: updateMessageDto.patient_id,
          },
        },
        doctor: {
          connect: {
            id: updateMessageDto.doctor_id,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.message.delete({
      where: {
        id,
      },
    });
  }
}
