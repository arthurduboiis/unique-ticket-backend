import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../companies/entities/company.entity";

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    date: Date;
    
    @ManyToOne(() => Company, (company) => company.reports)
    company: Company;
}
