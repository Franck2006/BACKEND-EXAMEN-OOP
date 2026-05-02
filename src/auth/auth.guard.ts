import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if(!authHeader ) return false;

    const token = authHeader.split(' ')[1];

    console.log("token: ", token);

    const { data, error } = await this.supabase.client.auth.getUser(token);

    console.log("error: ", error);

    if(error) throw new UnauthorizedException('Invalid token');

    const profile = await this.prisma.profile.findUnique({
      where:{
        user_id: data.user.id
      }
    })

    request.user = profile;

    console.log(request.user);
    
    return true;
  }
}
