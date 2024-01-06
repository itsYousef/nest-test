import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(username: string, pass: string) {
        const user = await this.userService.findByUsername(username);
        if (!bcrypt.compareSync(pass, user?.password)) {
            throw new UnauthorizedException();
        }

        const payload = { username: user.username, role: user.role };
        
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
