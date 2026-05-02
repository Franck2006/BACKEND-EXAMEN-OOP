import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'generated/prisma/enums';
import { RolesGuard } from 'src/auth/roles.guard';



@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("get-all-profiles")
  findAll() {
    return this.profileService.findAll();
  }

  @Get('get-profile/:id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.PATIENT, Role.DOCTOR)
  @Get('get-profile/me/:id')
  me(@Param('id') id: string) {
    return this.profileService.me(id);
  }

  @Patch('update-profile/:id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete('delete-profile/:id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
