import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto.js';
import { UpdateFeedbackDto } from './dto/update-feedback.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity.js';
import { Repository } from 'typeorm';
import { FeedTagService } from '../feed_tag/feed_tag.service.js';
import { FeedStatus } from './enum/feedback.enum.js';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly feedTagService: FeedTagService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, userId: number) {
    const { tags, ...rest } = createFeedbackDto;
    const feed = this.feedbackRepository.create({
      ...rest,
      userId,
      isDeleted: false,
      score: 0,
    });
    const savedFeed = await this.feedbackRepository.save(feed);
    if (tags && tags.length !== 0) {
      await Promise.all(
        tags.map((tag) =>
          this.feedTagService.create({
            feedbackId: savedFeed.id,
            tagId: tag.id,
          }),
        ),
      );
    }

    return await this.findOne(savedFeed.id);
  }

  async findAll() {
    return await this.feedbackRepository.find({
      where : {
        isDeleted : false,
        status : FeedStatus.PUBLIC
      },
      relations : {
        user : true,
        tags : {
          tag:true
        }
      },
      select : {
        user : {
          id : true,
          username : true
        },
        tags : {
          id :true,
          tag : {
            id : true,
            name : true
          }
        }
      }
    })
  }

  async findOne(id: number) {
    return await this.feedbackRepository.findOne({
      where: {
        id,
      },
      relations: {
        tags: {
          tag: true,
        },
      },
      select: {
        tags: {
          tag: true,
        },
      },
    });
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
