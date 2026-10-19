import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedTagService } from './feed_tag.service.js';
import { CreateFeedTagDto } from './dto/create-feed_tag.dto.js';
import { UpdateFeedTagDto } from './dto/update-feed_tag.dto.js';

@Controller('feed-tag')
export class FeedTagController {
  constructor(private readonly feedTagService: FeedTagService) {}

  @Post()
  create(@Body() createFeedTagDto: CreateFeedTagDto) {
    return this.feedTagService.create(createFeedTagDto);
  }

  @Get()
  findAll() {
    return this.feedTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedTagDto: UpdateFeedTagDto) {
    return this.feedTagService.update(+id, updateFeedTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedTagService.remove(+id);
  }
}
