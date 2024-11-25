import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUsers1729081715978 implements MigrationInterface {
    name = 'AddPasswordToUsers1729081715978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP COLUMN "password"`);
    }

}
