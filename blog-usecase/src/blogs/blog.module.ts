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
import { AuthGuard } from 'src/auth/auth.guard';
import { SuperAdmin } from 'src/superadmin/superadmin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog,Topic,User,TopicAccess,BlogAccess,SuperAdmin]),
  ],
    controllers: [blogController],
    providers: [blogService,AuthBlogGuard, ConfigService, JwtService,AuthGuard],
  })
  export class BlogModule {}