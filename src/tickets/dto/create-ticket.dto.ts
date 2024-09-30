import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty({ message: 'La catégorie est obligatoire.' })
  category: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Le token ID est obligatoire.' })
  tokenId: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'Le champ utilisé doit être un booléen.' })
  used: boolean;

  @ValidateNested()
  @Type(() => Event)
  event: Event; // Envoie de l'objet Event complet

  @ValidateNested()
  @Type(() => User)
  user: User; // Envoie de l'objet User complet
}
