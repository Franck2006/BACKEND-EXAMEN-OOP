import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AiAgentService {
    constructor(private prisma: PrismaService){}
    
    getAppoinments(ai_prompt: string){
        return ""
    }
}
