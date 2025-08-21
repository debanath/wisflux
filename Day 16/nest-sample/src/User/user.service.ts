import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User){}

  findUsers(){
    return this.userModel.findAll();
  }

  addUser(user: CreateUserDto){
    return this.userModel.create({ ...user });
  }

  async validateUsers(username: string, password: string){
    const user = await this.userModel.findOne({where: {name: username}})
    if(user && user.password === password){
      return user;
    }

    return null;
  }
}