import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { FeedStatus } from "../enum/feedback.enum.js";
import { Type } from 'class-transformer';

class TagDto {
    @IsNumber()
    id : number

    @IsString()
    name : string
}
export class CreateFeedbackDto {

    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsNotEmpty()
    description : string

    @IsEnum(FeedStatus)
    status : FeedStatus

    @IsArray()
    @ValidateNested({each : true})
    @Type(() => TagDto)
    tags : TagDto[]

}


