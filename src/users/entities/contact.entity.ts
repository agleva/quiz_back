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

    @ManyToOne(() => UserEntity, (user) => user.contact, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: UserEntity;

    @Column({nullable: true})
    createdAt?: Date;

    @Column({nullable: true})
    updatedAt?: Date;

}
