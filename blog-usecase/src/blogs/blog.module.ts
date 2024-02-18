import { Module } from '@nestjs/common';
import { TypeOrmModule } from  '@nestjs/typeorm';
import { blogController } from './blog.controller';
import { blogService } from './blog.service';
import { Blog } from './blogs.entity';
import { JwtModule } from '@nestjs/jwt';
import { Topic } from 'src/topics/topic.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog,Topic]),
    JwtModule.register({ secret: 'secret' ,signOptions: {expiresIn: '1d'}  }) 
  ],
    controllers: [blogController],
    providers: [blogService],
  })
  export class BlogModule {}