import { IsEnum, IsNumber } from "class-validator";
import { VoteType } from "../entities/vote.entity";

export class CreateVoteDto {

    @IsEnum(VoteType)
    voteType: VoteType

    @IsNumber()
    feedback_id: number

    
}
