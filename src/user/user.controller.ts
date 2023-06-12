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
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
    @ApiResponse({ type: [UserEntity] })
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    @ApiResponse({ type: UserEntity })
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./public",
            filename: (_, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`)
            }
        })
    }))
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 1000000 }),
            // new FileTypeValidator({ fileType: 'image/png' }),
        ]
    })) file: Express.Multer.File) {
        console.log(file);
    }
}
