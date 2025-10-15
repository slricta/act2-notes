import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from '../users/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  // Create a new note
  async create(title: string, content: string, user: User): Promise<Note> {
    const note = this.notesRepository.create({ title, content, user });
    return await this.notesRepository.save(note);
  }

  // Get all notes for a user
  async findAll(user: User): Promise<Note[]> {
    return await this.notesRepository.find({ where: { user }, order: { id: 'DESC' } });
  }

  // Delete a note by ID for a user
  async delete(id: number, user: User): Promise<{ affected: number }> {
    const existing = await this.notesRepository.findOne({ where: { id, user } });
    if (!existing) {
      return { affected: 0 };
    }
    const res = await this.notesRepository.delete(id);
    return { affected: (res.affected ?? 0) };
  }

  // Update a note by ID for a user
  async update(id: number, title: string, content: string, user: User): Promise<Note | null> {
    const existing = await this.notesRepository.findOne({ where: { id, user } });
    if (!existing) {
      return null;
    }
    existing.title = title;
    existing.content = content;
    return await this.notesRepository.save(existing);
  }
}
