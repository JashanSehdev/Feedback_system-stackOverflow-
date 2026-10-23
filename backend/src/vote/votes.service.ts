import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/votes.entity.js';
import { DataSource, Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create.vote.dto.js';
import { Feedback } from '../feedback/entities/feedback.entity.js';
import { VoteEnum } from './enum/vote.enum.js';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createVoteDto: CreateVoteDto, userId: number) {
    return this.voteRepository.create({
      feedbackId: createVoteDto.feedbackId,
      vote_type: createVoteDto.voteType,
      userId,
    });
  }

  async findAlreadyVoted(userId: number, feedbackId: number) {
    return await this.voteRepository.findOneBy({
      userId,
      feedbackId,
    });
  }

  async setVote(userId: number, { feedbackId, voteType }: CreateVoteDto) {
    return this.dataSource.transaction(async (manager) => {
      const feedbackRepo = manager.getRepository(Feedback);
      const voteRepo = manager.getRepository(Vote);

      const feedback = await feedbackRepo.findOne({
        where: { id: feedbackId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!feedback)
        throw new NotFoundException({
          code: 'NOT_FOUND',
          message: 'Feedback not found',
        });

      const vote = await this.findAlreadyVoted(userId, feedbackId);

      if (!vote) {
        const vote = voteRepo.create({
          feedbackId,
          vote_type: voteType,
          userId,
        });

        await voteRepo.save(vote);
        const scoreChange = voteType === VoteEnum.down ? -1 : 1;

        feedback.score += scoreChange;

        await feedbackRepo.save(feedback);

        return {
          message: 'Vote successful',
          score: feedback.score,
          vote,
        };
      }

      if (voteType === vote.vote_type) {
        const scoreChange = voteType === VoteEnum.down ? +1 : -1;
        feedback.score = feedback.score + scoreChange;

        await voteRepo.delete(vote.id);
        await feedbackRepo.save(feedback);

        return {
          message: 'unvote successful',
          score: feedback.score,
          vote,
        };
      }

      const scoreChange = voteType === VoteEnum.down ? -2 : +2;
      feedback.score = feedback.score + scoreChange;
      await voteRepo.update(vote.id, { ...vote, vote_type: voteType });
      await feedbackRepo.save(feedback);

      return {
        message: 'vote successful',
        score: feedback.score,
        vote,
      };
    });
  }
}
