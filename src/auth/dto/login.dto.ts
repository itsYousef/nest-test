import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsInt, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({
        default: "test"
    })
    @IsString()
    username: string;

    @ApiProperty({
        default: "123456"
    })
    password: string;
}