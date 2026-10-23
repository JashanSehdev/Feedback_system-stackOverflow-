import { Injectable, Req } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity.js';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto, userId: number) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId,
    });

    return await this.commentRepository.save(comment);
  }

  async findAllfeedComments(feedbackId: number) {
    return this.commentRepository.find({
      where: {
        feedbackId,
        parentId: IsNull(),
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          username: true,
        },
        id : true,
        text : true,
        createdAt : true,
        feedbackId: true
      },
    });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
