import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmUsersService } from './crm-users.service';
import { CrmUsersController } from './crm-users.controller';
import { CrmUser } from './crm-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrmUser])],
  providers: [CrmUsersService],
  controllers: [CrmUsersController],
})
export class CrmUsersModule {}
