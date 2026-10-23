import { PartialType } from "@nestjs/mapped-types";
import { CreateVoteDto } from "./create.vote.dto.js";

export class UpdateVoteDto extends PartialType(CreateVoteDto){}