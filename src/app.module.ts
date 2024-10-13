import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { CompaniesModule } from './companies/companies.module';
import { ReportsModule } from './reports/reports.module';
import { CrmUsersModule } from './crm_users/crm_users.module';
import { EventsModule } from './events/events.module';
import { UserCompanyFollowingModule } from './user-company-following/user-company-following.module';
import { UserLikedEventsModule } from './user-liked-events/user-liked-events.module';
import { CrmUsersMemberOfCompaniesModule } from './crm-users-member-of-companies/crm-users-member-of-companies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CrmUsersModule,
    UsersModule,
    EventsModule,
    CompaniesModule,
    TicketsModule,
    ReportsModule,
    UserCompanyFollowingModule,
    UserLikedEventsModule,
    CrmUsersMemberOfCompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
