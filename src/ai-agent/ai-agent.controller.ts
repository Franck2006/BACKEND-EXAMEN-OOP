import { Controller, Post, Query } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Post("submit-prompt")
  getAppoinments(@Query() ai_prompt: string){
    return this.aiAgentService.getAppoinments(ai_prompt)
  }
}
