import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { CustomResponse, CustomError } from '../response';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from 'src/superadmin/sueradmin.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<CustomResponse> {
    try {
      const user = new User();
      user.id = createUserDto.id;
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = md5(createUserDto.password);
      user.role = createUserDto.role;

      const createUser = await this.userRepository.create(user);

      await this.userRepository.insert(createUser)

      const responseData = {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        password: createUser.password,
        role: createUser.role
      };

      return new CustomResponse(200, 'Successfully added user', responseData);

    } catch (error) {
      throw new CustomError(error.statusCode || 500, error.message || 'Internal Server Error');
    }

  }


  async loginUser(loginUserDto: LoginUserDto) {

    try {
      const { email } = loginUserDto

      loginUserDto.password = md5(loginUserDto.password)

      let user = await this.userRepository.findOne({ where: { email: email, password: loginUserDto.password } });

      if (!user) {
        throw new CustomError(403, "Email or Password is incorrect");
      }

      const token = await this.jwtService.sign({ userId: user.id, roleId:user.role })
      return token

    } catch (error) {

      throw new CustomError(error.status || 500, error.message);
    }

  }
}
