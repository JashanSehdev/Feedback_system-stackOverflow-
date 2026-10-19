import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { UpdateTagDto } from './dto/update-tag.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity.js';
import { ILike, In, Repository } from 'typeorm';
import { TagQueryDto } from './dto/query.dto.js';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository : Repository<Tag>
  ){}
  async create(createTagDto: CreateTagDto) {
    const existingTag = await this.findOneByName(createTagDto.name);
    if (existingTag) throw new ConflictException({ code : 'ALREADY_EXIST', message : 'Tag already exist'});

    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag)
  }

  async findAllByName({tag} : TagQueryDto) {

    if(!tag || tag.length == 0){
      return await this.tagRepository.find()
    }
     return await this.tagRepository.find({
      where : {
        name : ILike(`%${tag}%`)
      }
    })
  }

  async findOneByName (name : string) {
    return await this.tagRepository.findOne({
      where : {
        name
      }
    })
  }
  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
