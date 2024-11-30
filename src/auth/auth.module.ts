import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { CrmUsersModule } from '../crm_users/crm_users.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CrmUser } from 'src/crm_users/entities/crm_user.entity';

/**
 * The AuthModule is responsible for handling authentication-related functionality.
 * 
 * @module AuthModule
 * 
 * @imports
 * - PassportModule: Provides authentication strategies.
 * - JwtModule: Configures JWT with secret and expiration options.
 * - CrmUsersModule: Module for CRM user management.
 * - UsersModule: Module for general user management.
 * - TypeOrmModule: Integrates TypeORM with the User and CrmUser entities.
 * 
 * @controllers
 * - AuthController: Handles authentication-related HTTP requests.
 * 
 * @providers
 * - AuthService: Provides authentication services.
 * - JwtStrategy: Strategy for JWT authentication.
 * 
 * @exports
 * - AuthService: Makes AuthService available for other modules.
 */
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    CrmUsersModule,
    UsersModule,
    TypeOrmModule.forFeature([User, CrmUser]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
