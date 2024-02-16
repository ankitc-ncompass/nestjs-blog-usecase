import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SuperAdmin } from './superadmin.entity';
import { SuperAdminService } from './superadmin.service';
import { Module } from '@nestjs/common';
import { SuperAdminController } from './superadmin.controller';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

@Module({
  imports:[
    TypeOrmModule.forFeature([SuperAdmin, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), 
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService], 
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService, AuthGuard, ConfigService], 
})
export class SuperAdminModule {}
