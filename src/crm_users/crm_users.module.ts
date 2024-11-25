import { Module } from '@nestjs/common';
import { CrmUsersService } from './crm_users.service';
import { CrmUsersController } from './crm_users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmUser } from './entities/crm_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrmUser])],
  controllers: [CrmUsersController],
  providers: [CrmUsersService],
  exports: [CrmUsersService],
})
export class CrmUsersModule {}
