import { Controller, Post, Body, Get, Param, Patch, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { LoginUserDto } from 'src/superadmin/sueradmin.dto';
import { CustomError, CustomResponse } from 'src/response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @Post('login')
  async loginUser(@Body() loginUserDto:LoginUserDto){
    const token = await this.userService.loginUser(loginUserDto)
    if(!token){
      throw new CustomError(404,'failed to generate token')
  }

  return new CustomResponse(200,"successfully logged in",token)
  
  }
}