
import { Comment } from "src/comments/entities/comment.entity";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Vote } from "src/votes/entities/vote.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

export enum Role{
    ADMIN = 'ADMIN',
    USER = 'USER'
}


@Entity('user')
@Unique(['email','isActive'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({type:'enum',enum:Role,default:Role.USER})
    role: Role

    @CreateDateColumn()
    createdAt: Date

    @Column({default:true})
    isActive: boolean

    @OneToMany(()=>Feedback,(feedback)=>feedback.user)
    feedbacks: Feedback[]

    @OneToMany(()=>Comment,(comment)=>comment.user)
    comments: Comment[]

    @OneToMany(()=>Vote,(vote)=>vote.user)
    votes: Vote[]

   
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}

