import { ApiResponseProperty } from "@nestjs/swagger";
import { ProfileEntity } from "./profile.entity";

export class UserEntity {
    @ApiResponseProperty()
    id: number;
    
    password: string;

    profileId: number;
    
    @ApiResponseProperty()
    profile: ProfileEntity;
}