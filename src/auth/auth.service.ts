import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/creadetial.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
    constructor(
        private supabase: SupabaseService,
        private prisma: PrismaService
    ){}

    async signUp(createProfileDto: CreateProfileDto) {

    try {
      const { data, error } = await this.supabase.client.auth.admin.createUser({
        email: createProfileDto.email,
        password: createProfileDto.password,
        phone: createProfileDto.phone,
        email_confirm: true,

      })

      if (error) throw new Error(error.message)

      if (data) {
        await this.prisma.profile.create({
          data: {
            name: createProfileDto.name,
            lastname: createProfileDto.lastname,
            phone: data.user.phone || "",
            email: data.user?.email || '',
            role: 'USER',
            user: {
              connect: {
                id: data.user?.id
              }
            }
          }
        })

        return data.user
      }

    } catch (error) {
      if (error) {
        if (error.message.includes('rate limit')) {
          throw new Error('Too many signup attempts. Please wait a moment.');
        }
        throw new Error(error.message);
      }
      throw new Error(error.message)
    }
    return
  }

  async signIn(signInDto: UpdateProfileDto) {

    try {

      const { data, error } = await this.supabase.client.auth.signInWithPassword({
        email: signInDto.email,
        password: signInDto.password
      })

      if (error) throw new Error("something went wrong !!!!")

      await this.prisma.profile.upsert({
        where: {
          id: data.user?.id
        },
        update: {},
        create: {
          name: signInDto.name,
          lastname: signInDto.lastname,
          email: data.user.email || '',
          phone: data.user?.phone || '',
          role: 'USER',
          user: {
            connect: {
              id: data.user?.id
            }
          }
        }
      })

      return data.session

    } catch (error) {
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Email not confirmed. Please check your email for a confirmation link.');
      }
      throw new Error(error.message);
    }

  }

  async signOut(id: number) {
    const { error } = await this.supabase.client.auth.signOut()

    if (error) throw new Error(error.message)

    return { measage: "Signed out successfully" }
  }

}
