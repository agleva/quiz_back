import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmSqliteTestingModule = () => [
    TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:', 
        dropSchema: true,
        synchronize: true,
        migrationsRun: true,
        keepConnectionAlive: true,
        entities: [],
    }),
    TypeOrmModule.forFeature([

    ]),
]