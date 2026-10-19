import { Module } from '@nestjs/common';
import { FeedTagService } from './feed_tag.service.js';
import { FeedTagController } from './feed_tag.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedTag } from './entities/feed_tag.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([FeedTag])],
  controllers: [FeedTagController],
  providers: [FeedTagService],
  exports : [FeedTagService]
})
export class FeedTagModule {}
