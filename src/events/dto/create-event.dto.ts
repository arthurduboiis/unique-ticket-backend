import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsDateString,
  IsDecimal,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TicketCategory } from '../entities/ticket-category.entity';

export class CreateTicketCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la catégorie est obligatoire.' })
  categoryName: string;

  @IsString()
  @IsOptional()
  categoryDescription?: string;

  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    { message: 'Le prix doit être un nombre décimal valide.' }
  )
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Le nombre total de tickets est obligatoire.' })
  totalTickets: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Le nombre de tickets disponibles est obligatoire.' })
  availableTickets: number;

  @IsNumber()
  @IsOptional()
  ticketsScanned: number;

  @IsDateString(
    {},
    {
      message:
        'La date de disponibilité des tickets doit être une date valide.',
    }
  )
  availabilityDateTickets: Date;
}
export class CreateEventDto {
  @IsArray()
  @IsOptional()
  @IsString({
    each: true,
    message: 'Chaque artiste doit être une chaîne de caractères.',
  })
  artist?: string[];

  @IsString()
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La capacité est obligatoire.' })
  capacity: number;

  @IsString()
  @IsNotEmpty({ message: 'La ville est obligatoire.' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'L’adresse du contrat est obligatoire.' })
  contractAddress: string;

  @IsString()
  @IsOptional()
  coOrganizer?: string;

  @IsString()
  @IsOptional()
  mood?: string;

  @IsDateString({}, { message: 'La date de début doit être une date valide.' })
  @IsNotEmpty({ message: 'La date de début est obligatoire.' })
  startDate: Date;

  @IsDateString({}, { message: 'La date de fin doit être une date valide.' })
  @IsNotEmpty({ message: 'La date de fin est obligatoire.' })
  endDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Le type d’événement est obligatoire.' })
  eventType: string;

  @IsString()
  @IsNotEmpty({ message: 'L’image est obligatoire.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: 'Le lieu est obligatoire.' })
  place: string;

  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    { message: 'Le prix de départ doit être un nombre décimal valide.' }
  )
  @IsNotEmpty({ message: 'Le prix de départ est obligatoire.' })
  startingPrice: number;

  @ValidateNested({ each: true })
  @Type(() => CreateTicketCategoryDto)  // Utiliser CreateTicketCategoryDto ici
  @IsNotEmpty({ message: 'Les catégories de tickets sont obligatoires.' })
  ticketCategories: CreateTicketCategoryDto[];


  @IsUUID()
  @IsNotEmpty()
  companyId: number; 
}
