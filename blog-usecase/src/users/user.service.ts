import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { CustomResponse, CustomError } from '../response'; 
import * as md5 from 'md5';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

    }catch(error){
        throw new CustomError(error.statusCode || 500, error.message || 'Internal Server Error');
    }

}
}

