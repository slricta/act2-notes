import { Module } from '@nestjs/common';
// TypeORM module for database integration
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

// Define the Notes module
@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
