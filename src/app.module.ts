import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    PrismaModule,
    SupabaseModule
  ],
  controllers: [],
  providers: [
    PrismaService,
    SupabaseService
  ],
})
export class AppModule { }
