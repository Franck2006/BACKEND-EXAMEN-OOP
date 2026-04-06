import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService
  ) { }

  async sign_up(signUpCreadentials: { email: string, password: string, phone?: string }) {
    try {
      const { data, error } = await this.supabase.client.auth.signUp({
        email: signUpCreadentials.email,
        password: signUpCreadentials.password,
        phone: signUpCreadentials.phone,
      });

      if (error) throw new Error(error.message)

      const user = data.user;

      await this.prisma.profile.create({
        data: {
          email: user?.email || '',
          supabase_id: user?.id || '',
          phone: user?.phone || null
        }
      })

      return data
    } catch (error) {
      if (error) {
        if (error.message.includes('rate limit')) {
          throw new Error('Too many signup attempts. Please wait a moment.');
        }
        throw new Error(error.message);
      }
    }
  }

  async sign_in(signInCreadentials: { email: string, password: string }) {
    try {
      const { data, error } = await this.supabase.client.auth.signInWithPassword({
        email: signInCreadentials.email,
        password: signInCreadentials.password,
      });

      if (error) throw new Error(error.message)

      this.prisma.profile.upsert({
        where: {
          email: data?.user?.email
        },
        update: {},
        create: {
          email: data?.user?.email || '',
          supabase_id: data?.user?.id
        }
      })

      return data;
    } catch (error) {
      if (error.message.includes(' Email not confirmed')) {
        throw new Error('Email not confirmed. Please check your email for a confirmation link.');
      }
      throw new Error(error.message);
    }
  }

  async sign_out(token: string) {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: "Signed out successfully" };
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

}
