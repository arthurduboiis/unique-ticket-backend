import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationUsersLikedEvents1728744174874 implements MigrationInterface {
    name = 'CreateRelationUsersLikedEvents1728744174874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_liked_event" ("id" SERIAL NOT NULL, "userId" integer, "eventId" integer, CONSTRAINT "PK_b048ce2dafe8eb2a903270c6a8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "user_liked_event" ADD CONSTRAINT "FK_4c0c7483218b68433a638b68593" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_liked_event" ADD CONSTRAINT "FK_0e8165ec6f65323e9cd3eba00f6" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_liked_event" DROP CONSTRAINT "FK_0e8165ec6f65323e9cd3eba00f6"`);
        await queryRunner.query(`ALTER TABLE "user_liked_event" DROP CONSTRAINT "FK_4c0c7483218b68433a638b68593"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "likes" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_liked_event"`);
    }

}
