import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty()
  age: number;

  // @ApiProperty({ enum: ["Admin", "Moderator", "User"] })
  // role: UserRole;
}