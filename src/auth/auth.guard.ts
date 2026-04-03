import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private supabase: SupabaseService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];

    if (!token) return false;

    const { data, error } = await this.supabase.client.auth.getUser(token);

    if (error) throw new UnauthorizedException(error.message);

    request.user = data?.user;

    return true;
  }
}
