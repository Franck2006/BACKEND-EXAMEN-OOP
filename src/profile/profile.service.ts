import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService
  ) { }
  async create(createProfileDto: CreateProfileDto) {

    try {
      const { data, error } = await this.supabase.client.auth.signUp({
        email: createProfileDto.email,
        password: createProfileDto.password,
        phone: createProfileDto.phone
      })

      if (error) throw new Error("something went wrong")

      if (data) {
        await this.prisma.profile.create({
          data: {
            nom: createProfileDto.nom,
            post_nom: createProfileDto.post_nom,
            email: data.user?.email || '',
            role: 'USER',
            user: {
              connect: {
                id: data.user?.id
              }
            }
          }
        })
      }

    } catch (error) {
      console.log(error)

    }
    return
  }

  async signIn(updateProfileDto: UpdateProfileDto) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: updateProfileDto.email,
      password: updateProfileDto.password
    })

    if (error) throw new Error("something went wrong !!!!")

    this.prisma.profile.upsert({
      where: {
        id: data.user?.id
      },
      update: {},
      create: {
        nom: updateProfileDto.nom,
        post_nom: updateProfileDto.post_nom,
        email: data.user?.email || '',
        role: 'USER',
        user: {
          connect: {
            id: data.user?.id
          }
        }
      }
    })
  }

  signOut(id: number) {
    return `This action returns a #${id} profile`;
  }

}
