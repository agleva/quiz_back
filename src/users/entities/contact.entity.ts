import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_contact')
export class UserContactEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    phone1: string;

    @Column({nullable: true})
    phone2?: string;

    @ManyToOne(() => UserEntity, (user) => user.contact)
    user: UserEntity;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
