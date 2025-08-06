import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum VoteType{
    UPVOTE = 'UPVOTE',
    DOWNVOTE = 'DOWNVOTE'
}

@Unique(['user','feedback'])
@Entity()
export class Vote {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'enum',enum:VoteType,nullable:true})
    voteType: VoteType

    @ManyToOne(()=>User,(user)=>user.votes)
    user: User

    @ManyToOne(()=>Feedback,(feedback)=>feedback.votes)
    feedback: Feedback

}
