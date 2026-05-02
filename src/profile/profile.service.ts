import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.profile.findMany({
      include:{
        user: true,
        doctor: true,
        patient: true
      }
    })
  }

  async findOne(id: string) {
    console.log("id: ", id);
    return await this.prisma.profile.findUnique({
      where: { user_id: id },
      include: {
        user: true,
        doctor: true,
        patient: true
      }
    })
  }

  async me(id: string) {
    return await this.prisma.profile.findUnique({
      where:{
        id
      },
      include:{
        doctor: true,
        patient: true
      }
    })
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({
      where: {  id },
      data: updateProfileDto
    })
  }

  async remove(id: string) {
    return await this.prisma.profile.delete({
      where: { id }
    })
  }
}
