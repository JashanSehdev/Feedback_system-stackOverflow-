import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeedTagDto {

    @IsNumber()
    @IsNotEmpty()
    feedbackId : number

    @IsNumber()
    @IsNotEmpty()
    tagId : number


}
