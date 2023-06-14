import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAddressEntity } from "../users/entities/address.entity";
import { UserContactEntity } from "../users/entities/contact.entity";
import { UserEntity } from "../users/entities/user.entity";

export const TypeOrmSqliteTestingModule = () => [
    TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:', 
        dropSchema: true,
        synchronize: true,
        migrationsRun: true,
        keepConnectionAlive: true,
        entities: [
            UserEntity,
            UserAddressEntity,
            UserContactEntity
        ],
    }),
    TypeOrmModule.forFeature([
        UserEntity,
        UserAddressEntity,
        UserContactEntity
    ]),
]