import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProfileModule } from "./profile/profile.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProfileModule, ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
