import { Large } from "src/large/entities/large.entity";
import { Small } from "src/small/entities/small.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PolymorphicChildren } from "typeorm-polymorphic";

@Entity()
export class Bird {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @PolymorphicChildren(() => [Small, Large])
    bird: (Small | Large)[];
    

}
