import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    if (!token) return false;

    const { data, error } = await this.supabase.client.auth.getUser(token);

    if (error) throw new UnauthorizedException(error.message);

    const profile = await this.prisma.profile.findUnique({
      where: {
        email: data?.user?.email
      }
    })

    if (!profile) {
      throw new UnauthorizedException('Profile not found');
    }


    request.user = profile

    return true;
  }
}



