import { Comment } from "src/comments/entities/comment.entity";
import { FeedbackTag } from "src/feedback-tags/entities/feedback-tag.entity";
import { User } from "src/user/entities/user.entity";
import { Vote } from "src/votes/entities/vote.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Status{
    PUBLIC= 'PUBLIC',
    PRIVATE= 'PRIVATE'
}

@Entity()
export class Feedback {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({type:'enum',enum:Status,default:Status.PUBLIC})
    status:Status

    @CreateDateColumn()
    created_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @Column({default:true})
    is_visible: boolean

    @Column({default:0})
    score: number

    @ManyToOne(() => User, (user) => user.feedbacks)
    user: User

    @OneToMany(()=>Comment,(comment)=>comment.feedback)
    comments: Comment[]

    @OneToMany(()=>FeedbackTag,(feedbackTag)=>feedbackTag.feedback)
    tags: FeedbackTag[]

    @OneToMany(()=>Vote,(vote)=>vote.feedback)
    votes: Vote[]



}
