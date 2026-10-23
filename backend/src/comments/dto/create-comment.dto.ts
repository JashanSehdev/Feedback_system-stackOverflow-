import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

    @IsOptional()
    @IsNumber()
    parentId : number

    @IsString()
    text : string

    @IsNumber()
    feedbackId : number

}
