import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTableEvents1728811113372 implements MigrationInterface {
    name = 'EditTableEvents1728811113372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "stripeAccountId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "stripeAccountId" character varying NOT NULL`);
    }

}
