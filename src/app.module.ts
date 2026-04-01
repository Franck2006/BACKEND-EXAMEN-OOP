import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SupabaseService } from './supabase/supabase.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    SupabaseModule,
    ConfigModule.forRoot({
      isGlobal: true, // so you can inject process.env anywhere
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    SupabaseService
  ],
})
export class AppModule { }
