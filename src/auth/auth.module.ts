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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Clé secrète pour signer les tokens
      signOptions: { expiresIn: '60m' }, // Expiration du token
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
