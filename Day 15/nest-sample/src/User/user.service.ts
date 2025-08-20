import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UserService {
  private readonly Users:User[] = [];

  findUsers(){
    return this.Users;
  }

  addUser(user: User){
    return this.Users.push(user);
  }
}