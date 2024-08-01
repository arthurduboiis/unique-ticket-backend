import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCRMUsersTable1722512443536 implements MigrationInterface {
  name = 'CreateCRMUsersTable1722512443536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "crm_users" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "phoneNumber" character varying, "email" character varying NOT NULL, "profilePictureUrl" character varying, "profilePictureName" character varying, "companyId" integer, "role" character varying, "accessLevel" character varying, "permissions" jsonb, "newsletter" boolean, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_15686602673583990031cb0d8f5" UNIQUE ("email"), CONSTRAINT "PK_95d94b1acffa50c5cbd200f3650" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "crm_users"`);
  }
}
