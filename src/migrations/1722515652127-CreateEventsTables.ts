import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventsTables1722515652127 implements MigrationInterface {
    name = 'CreateEventsTables1722515652127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket_categories" ("id" SERIAL NOT NULL, "categoryName" character varying NOT NULL, "categoryDescription" character varying NOT NULL, "price" numeric NOT NULL, "totalTickets" integer NOT NULL, "availableTickets" integer NOT NULL, "ticketsScanned" integer NOT NULL, "eventId" integer, CONSTRAINT "PK_6e0ee8248a3915067d3f4b64b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "artist" character varying NOT NULL, "title" character varying NOT NULL, "capacity" integer NOT NULL, "city" character varying NOT NULL, "contractAddress" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "eventType" character varying NOT NULL, "image" character varying NOT NULL, "salle" character varying NOT NULL, "startingPrice" numeric NOT NULL, "stripeAccountId" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_categories" ADD CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_categories" DROP CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "ticket_categories"`);
    }

}
