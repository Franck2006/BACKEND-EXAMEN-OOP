import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  @Patch('update-profile/:id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete('delete-profile/:id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
