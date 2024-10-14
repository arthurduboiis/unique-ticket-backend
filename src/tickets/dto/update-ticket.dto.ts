import { IsBoolean } from 'class-validator';

export class UpdateTicketDto {
  @IsBoolean()
  used: boolean;
}