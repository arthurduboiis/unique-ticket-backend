import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Ticket } from '../../tickets/entities/ticket.entity';
  
  @Entity('users')
  export class User {
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
  
    @Column({ nullable: true })
    newsletter: boolean;
  
    @Column({ nullable: true })
    region: string;
  
    @Column({ nullable: true })
    gender: string;
  
    @Column({ nullable: true })
    birthdate: string;
  
    @Column({ nullable: true })
    wallet_address: string;
  
    @OneToMany(() => Ticket, ticket => ticket.user)
    tickets: Ticket[];
  
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
  }
  