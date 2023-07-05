import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsInt, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../auth/role.enum";


export class CreateUserDto {
  @ApiProperty({
    description: "User name",
    // minimum: 1,
    default: "Test User",
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: "test"
  })
  @IsString()
  username: string;

  @ApiProperty({
    default: "test@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    default: "+989379451234"
  })
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty()
  // @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsInt()
  age: number;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}