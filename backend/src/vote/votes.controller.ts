import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { VotesService } from './votes.service.js';
import { CreateVoteDto } from './dto/create.vote.dto.js';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
    setVote(@Body() createVoteDto : CreateVoteDto, @Req() req : Request & {user : any}){
      return this.votesService.setVote(req.user.id, createVoteDto)
    }
}
