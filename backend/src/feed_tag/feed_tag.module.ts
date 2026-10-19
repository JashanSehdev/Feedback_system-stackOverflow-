import { Module } from '@nestjs/common';
import { FeedTagService } from './feed_tag.service.js';
import { FeedTagController } from './feed_tag.controller.js';

@Module({
  controllers: [FeedTagController],
  providers: [FeedTagService],
})
export class FeedTagModule {}
