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
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Get JWT_SECRET from environment variables
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService], // Inject ConfigService into the factory function
    }),
    ConfigModule.forRoot(), // Import ConfigModule.forRoot() to load environment variables
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService, AuthGuard, ConfigService], // Add ConfigService to providers
})
export class SuperAdminModule {}
