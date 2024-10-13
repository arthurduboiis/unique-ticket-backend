import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { TicketCategory } from './ticket-category.entity';
  import { Company } from '../../companies/entities/company.entity';
  import { Ticket } from '../../tickets/entities/ticket.entity';
  
  @Entity('events')
  export class Event {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('simple-array',{nullable: true})
    artist: string[];
  
    @Column()
    title: string;

    @Column()
    description: string;
  
    @Column()
    capacity: number;
  
    @Column()
    city: string;
  
    @Column()
    contractAddress: string;

    @Column({nullable: true})
    coOrganizer: string;

    @Column()
    likes: number;

    @Column({nullable: true})
    mood: string;
  
    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
  
    @Column()
    eventType: string;
  
    @Column()
    image: string;
  
    @Column()
    place: string;
  
    @Column('decimal')
    startingPrice: number;
  
    @Column()
    stripeAccountId: string;
  
    @OneToMany(() => TicketCategory, (ticketCategory) => ticketCategory.event, {
      cascade: true,
    })
    ticketCategories: TicketCategory[];
  
    @ManyToOne(() => Company, (company) => company.events)
    company: Company;
  
    @OneToMany(() => Ticket, ticket => ticket.event)
    tickets: Ticket[];
  
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
  }
  