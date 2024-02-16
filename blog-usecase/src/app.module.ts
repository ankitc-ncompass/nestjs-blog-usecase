import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { Role } from './users/role.entity';
import { UserModule } from './users/user.module';
import { Topic } from './topics/topic.entity';
import { SuperAdmin } from './superadmin/superadmin.entity';
import { Blog } from './blogs/blogs.entity';
import { TopicAccess } from './topics/topic.access.entity';
import { BlogAccess } from './blogs/blog.access.entity';
import {TypeOrmModule } from '@nestjs/typeorm'
import { SuperAdminModule } from './superadmin/superadmin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicModule } from './topics/topic.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Role, Topic, SuperAdmin, Blog , TopicAccess , BlogAccess],
      synchronize: true, 
    }),
    UserModule,
    SuperAdminModule,
    TopicModule
  ],
  controllers:[AppController],
  providers:[AppService]
})
export class AppModule {}
 
