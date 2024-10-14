import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  tokenId: number;

  @IsBoolean()
  @IsNotEmpty()
  used: boolean;

  @IsUUID() // Assume que l'ID d'un événement est un UUID
  @IsNotEmpty()
  eventId: number;

  @IsUUID() // Assume que l'ID d'un utilisateur est un UUID
  @IsNotEmpty()
  userId: number;
}
