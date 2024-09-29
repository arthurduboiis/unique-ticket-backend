import { 
    IsString, 
    IsNotEmpty, 
    IsEmail, 
    IsOptional, 
    IsUrl, 
    IsEnum, 
    IsArray, 
    IsBoolean, 
    IsPhoneNumber, 
    IsNumber, 
    MinLength, 
    Matches 
  } from 'class-validator';
  
  export enum AccessLevel {
    FULL = 'admin',
    LIMITED = 'member',
    NONE = 'none',
  }
  
  // Regex pour le format du mot de passe (si nécessaire dans le futur)
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  
  export class CreateCrmUserDto {
    @IsString()
    @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères.' })
    firstname: string;
  
    @IsString()
    @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères.' })
    @IsOptional()
    lastname?: string;
  
    @IsPhoneNumber('FR', { message: 'Numéro de téléphone invalide.' }) // Remplacer 'FR' par le code du pays adapté si nécessaire
    @IsOptional()
    phoneNumber?: string;
  
    @IsEmail({}, { message: 'Email invalide.' })
    @IsNotEmpty({ message: 'Email est obligatoire.' })
    email: string;
  
    @IsUrl({}, { message: 'URL de l’image de profil invalide.' })
    @IsOptional()
    profilePictureUrl?: string;
  
    @IsString()
    @IsOptional()
    profilePictureName?: string;
  
    @IsNumber({}, { message: 'L’identifiant de l’entreprise doit être un nombre.' })
    @IsOptional()
    companyId?: number;
  
    @IsString()
    @IsOptional()
    role?: string;
  
    @IsEnum(AccessLevel, { message: 'Le niveau d’accès doit être full, limited ou none.' })
    @IsOptional()
    accessLevel?: AccessLevel;
  
    @IsArray({ message: 'Les permissions doivent être une liste de chaînes de caractères.' })
    @IsString({ each: true, message: 'Chaque permission doit être une chaîne de caractères.' })
    @IsOptional()
    permissions?: string[];
  
    @IsBoolean({ message: 'La newsletter doit être un booléen (true ou false).' })
    @IsOptional()
    newsletter?: boolean;
  }
  