import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1722513802477 implements MigrationInterface {
  name = 'CreateUsersTable1722513802477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "phoneNumber" character varying, "email" character varying NOT NULL, "newsletter" boolean, "region" character varying, "gender" character varying, "birthdate" character varying, "wallet_address" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
