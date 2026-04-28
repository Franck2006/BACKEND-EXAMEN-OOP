import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post("create-patient")
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get("find-all-patients")
  findAll() {
    return this.patientService.findAll();
  }

  @Get("find-patient/:id")
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch("update-patient/:id")
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete("delete-patient/:id")
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
