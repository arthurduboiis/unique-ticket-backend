import { IsNumber } from "class-validator";

export class CreateUserLikedEventDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  eventId: number;
}
