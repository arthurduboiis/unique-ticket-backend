import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1722433335094 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "users" (
            "id" SERIAL NOT NULL,
            "firstname" VARCHAR(255),
            "lastname" VARCHAR(255),
            "phoneNumber" VARCHAR(20),
            "email" VARCHAR(255) UNIQUE NOT NULL,
            "profilePicture" VARCHAR(255),
            "companyId" INTEGER,
            "role" VARCHAR(50),
            "accessLevel" VARCHAR(50),
            "permissions" JSONB,
            CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
        )
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
