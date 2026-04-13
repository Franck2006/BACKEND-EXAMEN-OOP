import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/create-profile.dto';

@Controller('auth')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post("sign-up")
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Post("sign-in")
  signIn(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.signIn(updateProfileDto);
  }

  @Post('sign-out/:id')
  signOut(@Param('id') id: string) {
    return this.profileService.signOut(+id);
  }

}
