import { Injectable } from '@nestjs/common';
import { CreateFeedTagDto } from './dto/create-feed_tag.dto.js';
import { UpdateFeedTagDto } from './dto/update-feed_tag.dto.js';

@Injectable()
export class FeedTagService {
  create(createFeedTagDto: CreateFeedTagDto) {
    return 'This action adds a new feedTag';
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
