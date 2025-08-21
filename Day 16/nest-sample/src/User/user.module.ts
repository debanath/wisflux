import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [SequelizeModule.forFeature([User]), PassportModule],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
})
export class UserModule {}