import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
}

export class CreateProfileDto {
    @ApiProperty({
        description: 'User name',
        // minimum: 1,
        default: "Test User",
    })
    name: string;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiProperty()
    age: number;

    @ApiProperty({ type: [String] })
    books: string[];

    @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
    role: UserRole;
}