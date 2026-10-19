import { IsOptional, IsString } from 'class-validator';

export class TagQueryDto {
  @IsOptional()
  @IsString()
  tag: string;
}
