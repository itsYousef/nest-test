import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      // global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // only if u want to globally apply the guard
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule { }
