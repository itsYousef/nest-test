import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @ApiCreatedResponse() //shorthand for next decorator
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
    })
    // @ApiForbiddenResponse() //shorthand for next decorator
    @ApiResponse({ status: 403, description: "Forbidden." })
    @Post()
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(+id);
    }
}
