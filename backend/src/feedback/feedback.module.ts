import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service.js';
import { FeedbackController } from './feedback.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity.js';
import { FeedTagModule } from '../feed_tag/feed_tag.module.js';

@Module({
  imports : [TypeOrmModule.forFeature([Feedback]), FeedTagModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],

})
export class FeedbackModule {}
