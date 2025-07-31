
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('user')
@Unique(['email','isActive'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({nullable:true})
    avatar?: string


    @Column({default:true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedat: Date

   

}

