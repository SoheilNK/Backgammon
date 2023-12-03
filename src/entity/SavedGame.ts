import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
@Unique(["matchId"])
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    matchId: string;

    @Column()
    @IsNotEmpty()
    hostId: number;

    @Column()
    @IsNotEmpty()
    guestId: number;

    @Column()
    @IsNotEmpty()
    matchState: string;


    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

 
}