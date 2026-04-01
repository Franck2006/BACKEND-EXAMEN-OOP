import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SupabaseService } from './supabase/supabase.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so you can inject process.env anywhere
    }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    SupabaseService
  ],
})
export class AppModule { }
