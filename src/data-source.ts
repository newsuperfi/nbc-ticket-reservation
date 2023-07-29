import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Concert } from './entity/Concert';
import { Reservation } from './entity/Reservation';
import { Concert_date } from './entity/Concert_date';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dlsvmfjs27!',
  database: 'ticket-reservation',
  synchronize: true,
  logging: true,
  entities: [User, Concert, Reservation, Concert_date],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});
