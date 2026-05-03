import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import {
  CreateMessageDto,
  Doctor_patient_message,
} from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send-message')
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('get-all-messages')
  findAll() {
    return this.messageService.findAll();
  }

  @Get('get-message/:id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Get('get-for-doctor/:id')
  getOneMessageForDoctor(id: string) {
    return this.messageService.getOneMessageForDoctor(id);
  }

  @Get('get-for-doctor/:id')
  getOneMessageForDoctorPatient(
    @Body() doctor_patient_message: Doctor_patient_message,
  ) {
    return this.messageService.getOneMessageForDoctorPatient(
      doctor_patient_message,
    );
  }

  @Patch('update-message/:id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete('delete-message/:id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
