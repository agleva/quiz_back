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
    state: string; 

    @Column()
    country: string;

    @ManyToOne(() => UserEntity, (user) => user.address, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: UserEntity;

    @Column({nullable: true})
    createdAt?: Date;

    @Column({nullable: true})
    updatedAt?: Date;

}
