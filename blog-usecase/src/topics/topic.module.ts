import { Module } from '@nestjs/common';
import { TypeOrmModule } from  '@nestjs/typeorm';
//import { JwtModule } from '@nestjs/jwt';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.entity';
import { SuperAdmin } from 'src/superadmin/superadmin.entity';
import {  ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TopicAccess } from './topic.access.entity';
import { Role } from 'src/users/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Topic,User,SuperAdmin,TopicAccess,Role]),
  ],
    controllers: [TopicController],
    providers: [TopicService, AuthGuard, ConfigService, JwtService],
  })
  export class TopicModule {}