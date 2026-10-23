import { IsEnum, IsNumber } from "class-validator";
import { VoteEnum } from "../enum/vote.enum.js";

export class CreateVoteDto {


    @IsNumber()
    feedbackId : number

    @IsEnum(VoteEnum)
    voteType : VoteEnum
}