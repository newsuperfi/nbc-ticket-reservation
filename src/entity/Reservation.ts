import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Concert } from './Concert';
import { Concert_date } from './Concert_date';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ticket_price: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  total_price: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservations)
  concert: Concert;

  @ManyToOne(() => Concert_date, (concert_date) => concert_date.reservations)
  concert_date: Concert_date;
}
