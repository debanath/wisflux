import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  @Get()
  async findAll(){
    return await this.userService.findUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto){
    return await this.userService.addUser(user)
  }

  @Post(':id')
  // ! pass id via body
  // createUserWithId(@Param('id') id: number,@Body() user: CreateUserDto){
  //   return this.userService.addUser({id, ...user})
  // }
  // ! pass id via query
  async createUserWithId(@Param('id',ParseIntPipe) id: number, @Body() user: CreateUserDto){
    return await this.userService.addUser(user)
  }
  @UseGuards(AuthGuard('local'))
  @Post('auth')
  login(@Req() req){
    return req;
  }
}