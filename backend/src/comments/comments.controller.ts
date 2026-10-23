import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto,  @Req() req : Request &  {user : any}) {
    const result =  this.commentsService.create(createCommentDto, req.user.id);

    return {...result, user: {
      id: req.user.id,
      username : req.user.username
    }}
  }

  @Get('feedback/:id')
  getPostComment(@Param('id', ParseIntPipe) id : number){
    return this.commentsService.findAllfeedComments(id)
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
