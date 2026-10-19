import { Injectable } from '@nestjs/common';
import { CreateFeedTagDto } from './dto/create-feed_tag.dto.js';
import { UpdateFeedTagDto } from './dto/update-feed_tag.dto.js';
import { Repository } from 'typeorm';
import { FeedTag } from './entities/feed_tag.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedTagService {
  constructor (
    @InjectRepository(FeedTag)
    private readonly feedTagRepository : Repository<FeedTag>
  ) {}
  async create(createFeedTagDto: CreateFeedTagDto) {
    const feedTag =  this.feedTagRepository.create(createFeedTagDto)
    return await this.feedTagRepository.save(feedTag)
  }

  findAll() {
    return `This action returns all feedTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedTag`;
  }

  update(id: number, updateFeedTagDto: UpdateFeedTagDto) {
    return `This action updates a #${id} feedTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedTag`;
  }
}
