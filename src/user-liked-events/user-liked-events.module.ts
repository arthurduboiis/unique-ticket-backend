import { Module } from '@nestjs/common';
import { UserLikedEventsService } from './user-liked-events.service';
import { UserLikedEventsController } from './user-liked-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikedEvent } from './entities/user-liked-event.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLikedEvent, User, Event])],
  controllers: [UserLikedEventsController],
  providers: [UserLikedEventsService],
})
export class UserLikedEventsModule {}
