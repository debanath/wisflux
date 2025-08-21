import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './User/user.model';

@Module({
  imports: [UserModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    database: 'userDemo',
    host: 'localhost',
    port: 5112,
    username: 'postgres',
    password: 'postgres',
    models: [User],
    // logging: true,
    autoLoadModels: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
