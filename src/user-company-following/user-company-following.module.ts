import { Module } from '@nestjs/common';
import { UserCompanyFollowingService } from './user-company-following.service';
import { UserCompanyFollowingController } from './user-company-following.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompanyFollowing } from './entities/user-company-following.entity';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserCompanyFollowing, User, Company]), // Charger les entités nécessaires
  ],
  controllers: [UserCompanyFollowingController],
  providers: [UserCompanyFollowingService],
})
export class UserCompanyFollowingModule {}
