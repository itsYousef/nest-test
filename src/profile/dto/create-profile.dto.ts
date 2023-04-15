import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    age: number;
}
