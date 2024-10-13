import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator';
export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    date: Date;

    @IsUUID()
    @IsNotEmpty()
    companyId: number; 
}
