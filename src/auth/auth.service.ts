import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService
  ) { }

  async sign_up(signUpCreadentials: any) {
    const { data, error } = await this.supabase.client.auth.signUp({
      email: signUpCreadentials.email,
      password: signUpCreadentials.password,
      phone: signUpCreadentials.phone,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async sign_in(signInCreadentials: any) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: signInCreadentials.email,
      password: signInCreadentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async sign_out() {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: "Signed out successfully" };
  }
}
