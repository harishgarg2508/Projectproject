import { Bird } from "src/bird/entities/bird.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PolymorphicParent } from "typeorm-polymorphic";

@Entity()
export class Large {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @PolymorphicParent(() => Bird)
    restaurant: Bird;
    

}
