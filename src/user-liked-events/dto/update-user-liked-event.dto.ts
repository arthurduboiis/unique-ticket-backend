import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLikedEventDto } from './create-user-liked-event.dto';

export class UpdateUserLikedEventDto extends PartialType(CreateUserLikedEventDto) {}
