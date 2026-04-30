import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post("create-schedule")
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get("find-all-schedules")
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get("find-schedule/:id")
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch("update-schedule/:id")
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete("delete-schedule/:id")
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
