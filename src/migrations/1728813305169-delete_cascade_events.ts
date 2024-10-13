import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCascadeEvents1728813305169 implements MigrationInterface {
    name = 'DeleteCascadeEvents1728813305169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_categories" DROP CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd"`);
        await queryRunner.query(`ALTER TABLE "ticket_categories" ADD CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_categories" DROP CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd"`);
        await queryRunner.query(`ALTER TABLE "ticket_categories" ADD CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
