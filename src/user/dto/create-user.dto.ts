import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsInt, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

// export enum UserRole {
//   Admin = "Admin",
//   Moderator = "Moderator",
//   User = "User",
// }

export class CreateUserDto {
  @ApiProperty({
    description: "User name",
    // minimum: 1,
    default: "Test User",
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty()
  // @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsInt()
  age: number;

  // @ApiProperty({ enum: ["Admin", "Moderator", "User"] })
  // role: UserRole;
}