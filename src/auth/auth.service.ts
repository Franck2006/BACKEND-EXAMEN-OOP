import { Injectable } from '@nestjs/common';
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

    const { data, error } = await this.supabase.client.auth.admin.createUser({
      email: createProfileDto.email,
      password: createProfileDto.password,
      phone: createProfileDto.phone,
      email_confirm: true,
    })

    if (error) throw new Error(error.message)

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

  async signIn(signInDto: UpdateProfileDto) {

    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: signInDto.email,
      password: signInDto.password
    })

    if (error) throw new Error("something went wrong !!!!")

    return data.session

  }

  async signOut(id: number) {
    const { error } = await this.supabase.client.auth.signOut()

    if (error) throw new Error(error.message)

    return { measage: "Signed out successfully" }
  }

}
