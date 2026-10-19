import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedTagDto } from './create-feed_tag.dto.js';

export class UpdateFeedTagDto extends PartialType(CreateFeedTagDto) {}
