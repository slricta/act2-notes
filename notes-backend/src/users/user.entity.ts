import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity()
// generates a table named 'user' in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Note, note => note.user)
  notes: Note[];
}
