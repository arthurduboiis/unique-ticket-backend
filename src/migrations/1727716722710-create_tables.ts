import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1727716722710 implements MigrationInterface {
    name = 'CreateTables1727716722710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket_categories" ("id" SERIAL NOT NULL, "categoryName" character varying NOT NULL, "categoryDescription" character varying, "price" numeric NOT NULL, "totalTickets" integer NOT NULL, "availableTickets" integer NOT NULL, "ticketsScanned" integer NOT NULL, "availabilityDateTickets" TIMESTAMP NOT NULL, "eventId" integer, CONSTRAINT "PK_6e0ee8248a3915067d3f4b64b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crm_users" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "phoneNumber" character varying, "email" character varying NOT NULL, "profilePicture" jsonb, "companyId" integer, "role" character varying, "accessLevel" character varying, "permissions" jsonb, "newsletter" boolean, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_15686602673583990031cb0d8f5" UNIQUE ("email"), CONSTRAINT "PK_95d94b1acffa50c5cbd200f3650" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reports" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "companyId" integer, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_company_following" ("id" SERIAL NOT NULL, "notificationsEnabled" boolean NOT NULL DEFAULT false, "userId" integer, "companyId" integer, CONSTRAINT "PK_2cf17099cdbce3862fd5e3fd92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "companyLogo" jsonb NOT NULL, "primaryColor" character varying NOT NULL, "accountSubscriptionStatus" character varying NOT NULL, "stripeAccountId" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "artist" text, "title" character varying NOT NULL, "description" character varying NOT NULL, "capacity" integer NOT NULL, "city" character varying NOT NULL, "contractAddress" character varying NOT NULL, "coOrganizer" character varying, "likes" integer NOT NULL, "mood" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "eventType" character varying NOT NULL, "image" character varying NOT NULL, "place" character varying NOT NULL, "startingPrice" numeric NOT NULL, "stripeAccountId" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "tokenId" integer NOT NULL, "used" boolean NOT NULL, "eventId" integer, "userId" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "phoneNumber" character varying, "email" character varying NOT NULL, "newsletter" boolean, "region" character varying, "gender" character varying, "birthdate" character varying, "wallet_address" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_categories" ADD CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD CONSTRAINT "FK_852c8dab120902bf1a3cc3ede40" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_3e09df54253cec513760c1dc7fc" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_company_following" ADD CONSTRAINT "FK_48233175deeb8a4359ad9ac6097" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_company_following" ADD CONSTRAINT "FK_6da5acf99011b8d5b0d658767cd" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_b42eb62a0da91cc26d953db93cd" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_8a101375d173c39a7c1d02c9d7d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_4bb45e096f521845765f657f5c8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_4bb45e096f521845765f657f5c8"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_8a101375d173c39a7c1d02c9d7d"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_b42eb62a0da91cc26d953db93cd"`);
        await queryRunner.query(`ALTER TABLE "user_company_following" DROP CONSTRAINT "FK_6da5acf99011b8d5b0d658767cd"`);
        await queryRunner.query(`ALTER TABLE "user_company_following" DROP CONSTRAINT "FK_48233175deeb8a4359ad9ac6097"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_3e09df54253cec513760c1dc7fc"`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP CONSTRAINT "FK_852c8dab120902bf1a3cc3ede40"`);
        await queryRunner.query(`ALTER TABLE "ticket_categories" DROP CONSTRAINT "FK_2ad8657ef2ed9823647959b79bd"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "user_company_following"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TABLE "crm_users"`);
        await queryRunner.query(`DROP TABLE "ticket_categories"`);
    }

}
