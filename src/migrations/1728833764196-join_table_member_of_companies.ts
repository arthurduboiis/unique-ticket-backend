import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinTableMemberOfCompanies1728833764196 implements MigrationInterface {
    name = 'JoinTableMemberOfCompanies1728833764196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_users" DROP CONSTRAINT "FK_852c8dab120902bf1a3cc3ede40"`);
        await queryRunner.query(`CREATE TABLE "crm_users_member_of_companies" ("id" SERIAL NOT NULL, "accessLevel" character varying, "permissions" jsonb, "crmUserId" integer, "companyId" integer, CONSTRAINT "PK_76e5e093958ac1749ef9a0224ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP COLUMN "accessLevel"`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP COLUMN "permissions"`);
        await queryRunner.query(`ALTER TABLE "crm_users_member_of_companies" ADD CONSTRAINT "FK_93353d9d4ef4e42bd1591c976ec" FOREIGN KEY ("crmUserId") REFERENCES "crm_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crm_users_member_of_companies" ADD CONSTRAINT "FK_a84d53379783118e7b410577fed" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_users_member_of_companies" DROP CONSTRAINT "FK_a84d53379783118e7b410577fed"`);
        await queryRunner.query(`ALTER TABLE "crm_users_member_of_companies" DROP CONSTRAINT "FK_93353d9d4ef4e42bd1591c976ec"`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD "permissions" jsonb`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD "accessLevel" character varying`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD "companyId" integer`);
        await queryRunner.query(`DROP TABLE "crm_users_member_of_companies"`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD CONSTRAINT "FK_852c8dab120902bf1a3cc3ede40" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
