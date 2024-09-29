import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
  } from 'typeorm';
  import { Company } from '../../companies/entities/company.entity';
  
  @Entity('crm_users')
  export class CrmUser {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    firstname: string;
  
    @Column({ nullable: true })
    lastname: string;
  
    @Column({ nullable: true })
    phoneNumber: string;
  
    @Column({ unique: true })
    email: string;
  
    @ManyToMany(() => Company, company => company.members)
    company: Company;
  
    @Column({ nullable: true })
    profilePictureUrl: string;
  
    @Column({ nullable: true })
    profilePictureName: string;
  
    @Column({ nullable: true })
    companyId: number;
  
    @Column({ nullable: true })
    role: string;
  
    @Column({ nullable: true })
    accessLevel: string;
  
    @Column('jsonb', { nullable: true })
    permissions: string[];
  
    @Column({ nullable: true })
    newsletter: boolean;
  
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
  }
  
