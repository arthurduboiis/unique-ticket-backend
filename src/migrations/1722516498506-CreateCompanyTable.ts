import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyTable1722516498506 implements MigrationInterface {
    name = 'CreateCompanyTable1722516498506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "companyLogo" jsonb NOT NULL, "primaryColor" character varying NOT NULL, "accountSubscriptionStatus" character varying NOT NULL, "stripeAccountId" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_b42eb62a0da91cc26d953db93cd" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD CONSTRAINT "FK_852c8dab120902bf1a3cc3ede40" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_users" DROP CONSTRAINT "FK_852c8dab120902bf1a3cc3ede40"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_b42eb62a0da91cc26d953db93cd"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "companyId"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
