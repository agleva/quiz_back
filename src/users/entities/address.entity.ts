import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_address')
export class UserAddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    neighborhood: string;

    @Column()
    number: number;

    @Column()
    city: string;

    @Column()
    country: string;

    @ManyToOne(() => UserEntity, (user) => user.address)
    user: UserEntity;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
