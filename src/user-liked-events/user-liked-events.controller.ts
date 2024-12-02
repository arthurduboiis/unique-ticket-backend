import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLikedEventsService } from './user-liked-events.service';
import { CreateUserLikedEventDto } from './dto/create-user-liked-event.dto';
import { UpdateUserLikedEventDto } from './dto/update-user-liked-event.dto';

@Controller('user-liked-events')
export class UserLikedEventsController {
  constructor(
    private readonly userLikedEventsService: UserLikedEventsService
  ) {}

  @Post()
  create(@Body() createUserLikedEventDto: CreateUserLikedEventDto) {
    const { userId, eventId } = createUserLikedEventDto;
    return this.userLikedEventsService.addLikedEvent(userId, eventId);
  }

  @Post('remove')
  remove(@Body() createUserLikedEventDto: CreateUserLikedEventDto) {
    const { userId, eventId } = createUserLikedEventDto;
    return this.userLikedEventsService.removeLikedEvent(userId, eventId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.userLikedEventsService.getLikedEventsForUser(+userId);
  }
}
