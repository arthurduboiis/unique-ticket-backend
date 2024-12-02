import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikedEvent } from './entities/user-liked-event.entity';

@Injectable()
export class UserLikedEventsService {
  constructor(
    @InjectRepository(UserLikedEvent)
    private readonly userLikedEventRepository: Repository<UserLikedEvent>,
  ) {}

  async addLikedEvent(userId: number, eventId: number): Promise<UserLikedEvent> {
    const likedEvent = this.userLikedEventRepository.create({ user: { id: userId }, event: { id: eventId } });
    return this.userLikedEventRepository.save(likedEvent);
  }

  async removeLikedEvent(userId: number, eventId: number): Promise<void> {
    await this.userLikedEventRepository.delete({ user: { id: userId }, event: { id: eventId } });
  }

  async getLikedEventsForUser(userId: number): Promise<UserLikedEvent[]> {
    return this.userLikedEventRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
    });
  }
}
