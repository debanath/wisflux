import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService){
    this.userService.addUser({id:1,name: "Deba",email: "debanath26@gmail.com"})
  }
  @Get()
  findAll(){
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto){
    return this.userService.addUser({id:2, ...user})
  }

  @Post()
  // ! pass id via body
  // createUserWithId(@Param('id') id: number,@Body() user: CreateUserDto){
  //   return this.userService.addUser({id, ...user})
  // }
  // ! pass id via query
  createUserWithId(@Param('id',ParseIntPipe) id: number, @Body() user: CreateUserDto){
    return this.userService.addUser({id, ...user})
  }
}