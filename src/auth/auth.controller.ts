import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @ApiTags("auth")
    @ApiBody({ type: LoginDto })
    @UseGuards(LocalAuthGuard)
    @Public()
    signIn(@Request() req) {
        return this.authService.login(req.user);
    }
}
