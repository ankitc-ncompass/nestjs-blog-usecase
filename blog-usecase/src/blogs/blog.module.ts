import { Module } from '@nestjs/common';
import { TypeOrmModule } from  '@nestjs/typeorm';
import { blogController } from './blog.controller';
import { blogService } from './blog.service';
import { Blog } from './blogs.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Topic } from 'src/topics/topic.entity';
import { AuthBlogGuard } from 'src/auth/auth-blog.guard';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { TopicAccess } from 'src/topics/topic.access.entity';
import { BlogAccess } from './blog.access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog,Topic,User,TopicAccess,BlogAccess]),
  ],
    controllers: [blogController],
    providers: [blogService,AuthBlogGuard, ConfigService, JwtService],
  })
  export class BlogModule {}