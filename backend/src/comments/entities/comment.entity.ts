import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";


@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({default:true})
    is_visible: boolean

    @ManyToOne(() => User, (user) => user.comments)
    user: User
    
    @ManyToOne(()=>Feedback,(feedback)=>feedback.comments)
    feedback: Feedback

    @ManyToOne(()=>Comment,(comment)=>comment.children)
    parent: Comment

    @OneToMany(()=>Comment,(comment)=>comment.parent)
    children: Comment


}
