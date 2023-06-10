import { ApiResponseProperty } from "@nestjs/swagger";

export class ProfileEntity {
    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    name: string;

    @ApiResponseProperty()
    email: string;

    @ApiResponseProperty()
    phone: string;

    @ApiResponseProperty()
    age: number;
}