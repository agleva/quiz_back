import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAddressEntity } from "./address.entity";
import { UserContactEntity } from "./contact.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => UserAddressEntity, (addres) => addres.user)
    address: UserAddressEntity[]

    @OneToMany(() => UserContactEntity, (contact) => contact.user)
    contact: UserContactEntity[]

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
