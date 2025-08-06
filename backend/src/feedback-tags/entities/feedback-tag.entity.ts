import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['feedback', 'tag'])
export class FeedbackTag {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Feedback, (feedback) => feedback.tags)
    feedback: Feedback

    @ManyToOne(()=>Tag,(tag)=>tag.feedbacks)
    tag: Tag
}
