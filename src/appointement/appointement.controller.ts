import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointementService } from './appointement.service';
import { CreateAppointementDto } from './dto/create-appointement.dto';
import { UpdateAppointementDto } from './dto/update-appointement.dto';

@Controller('appointement')
export class AppointementController {
  constructor(private readonly appointementService: AppointementService) {}

  @Post("create-appointement")
  create(@Body() createAppointementDto: CreateAppointementDto) {
    return this.appointementService.create(createAppointementDto);
  }

  @Get("find-all-appointements")
  findAll() {
    return this.appointementService.findAll();
  }

  @Get("find-appointement/:id")
  findOne(@Param('id') id: string) {
    return this.appointementService.findOne(id);
  }

  @Patch("update-appointement/:id")
  update(@Param('id') id: string, @Body() updateAppointementDto: UpdateAppointementDto) {
    return this.appointementService.update(id, updateAppointementDto);
  }

  @Delete("delete-appointement/:id")
  remove(@Param('id') id: string) {
    return this.appointementService.remove(id);
  }
}
