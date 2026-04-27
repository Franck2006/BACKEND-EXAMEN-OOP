import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SupabaseService } from './supabase/supabase.service';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { AppointementModule } from './appointement/appointement.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { MessageModule } from './message/message.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { AiAgentModule } from './ai-agent/ai-agent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so you can inject process.env anywhere
    }),
    PrismaModule,
    SupabaseModule,
    ProfileModule,
    AppointementModule,
    PatientModule,
    DoctorModule,
    MessageModule,
    ScheduleModule,
    AuthModule,
    AiAgentModule,

  ],
  controllers: [],
  providers: [
    PrismaService,
    SupabaseService
  ],
})
export class AppModule { }
