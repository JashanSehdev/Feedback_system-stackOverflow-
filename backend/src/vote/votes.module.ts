import { Module } from '@nestjs/common';
import { VotesService } from './votes.service.js';
import { VotesController } from './votes.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/votes.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Vote])],
  controllers: [VotesController],
  providers: [VotesService],
  exports : [VotesService]
})
export class VotesModule {}
