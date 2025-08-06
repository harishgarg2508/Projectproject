import { FeedbackTag } from "src/feedback-tags/entities/feedback-tag.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => FeedbackTag, (feedbackTag) => feedbackTag.tag)
    feedbacks: FeedbackTag[]
}
