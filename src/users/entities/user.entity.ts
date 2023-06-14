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

    @Column({nullable: true})
    password?: string;

    @OneToMany(() => UserAddressEntity, (addres) => addres.user, {
        cascade: true,
    })
    address: UserAddressEntity[]

    @OneToMany(() => UserContactEntity, (contact) => contact.user, {
        cascade: ['insert', 'update', 'remove'],
    })
    contact: UserContactEntity[]

    @Column({nullable: true})
    createdAt?: Date;

    @Column({nullable: true})
    updatedAt?: Date;
}
