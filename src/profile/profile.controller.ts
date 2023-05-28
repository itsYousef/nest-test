import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto, Profile } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("profile")
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @ApiCreatedResponse() //shorthand for next decorator
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  // @ApiForbiddenResponse() //shorthand for next decorator
  @ApiResponse({ status: 403, description: "Forbidden." })
  @Post()
  @ApiBody({ type: [CreateProfileDto] })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.profileService.remove(+id);
  }
}
