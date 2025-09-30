import { Controller, Post, Get, Delete, Body, UseGuards, Req, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private notes: NotesService) {}

  @Post()
  create(@Body() body: { title: string; content: string }, @Req() req: any) {
    return this.notes.create(body.title, body.content, req.user);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.notes.findAll(req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Req() req: any) {
    return this.notes.delete(id, req.user);
  }
}
