import {MigrationInterface, QueryRunner} from "typeorm";

export class CurrentMigration1733650112818 implements MigrationInterface {
    name = 'CurrentMigration1733650112818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "authors" (
                "id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "bio" character varying NOT NULL,
                "birth_date" TIMESTAMP,
                "death_date" TIMESTAMP,
                "image_url" character varying,
                CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"),
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "full_amount" integer NOT NULL,
                "description" character varying NOT NULL,
                "image_url" character varying,
                "author_id" integer,
                CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "username" character varying,
                "name" character varying,
                "role" character varying(30) NOT NULL DEFAULT 'STANDARD',
                "language" character varying(15) NOT NULL DEFAULT 'en-US',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "image_url" character varying,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_loans" (
                "id" SERIAL NOT NULL,
                "booking_start_date" TIMESTAMP NOT NULL,
                "booking_end_date" TIMESTAMP NOT NULL,
                "loan_start_date" TIMESTAMP NOT NULL,
                "loan_end_date" TIMESTAMP NOT NULL,
                "book_id" integer,
                "user_id" integer,
                CONSTRAINT "PK_f7ad6d7bdab26c03e3fd6efeb55" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genres_books_books" (
                "genres_id" integer NOT NULL,
                "books_id" integer NOT NULL,
                CONSTRAINT "PK_df95be61aa13947a7896324fc10" PRIMARY KEY ("genres_id", "books_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9690986762184b989cc03c41ed" ON "genres_books_books" ("genres_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1160d4a23baf2a8d8ac2e89d6e" ON "genres_books_books" ("books_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "books_genres_genres" (
                "books_id" integer NOT NULL,
                "genres_id" integer NOT NULL,
                CONSTRAINT "PK_74630d4f541d5fd4cfd6fe9bbe4" PRIMARY KEY ("books_id", "genres_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b1f16cfd502b1c038223f42f1b" ON "books_genres_genres" ("books_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5394ae1babdaf4f0bffe7116ca" ON "books_genres_genres" ("genres_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "FK_1056dbee4616479f7d562c562df" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_loans"
            ADD CONSTRAINT "FK_c54283a3ac15202f0decd43cbaf" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_loans"
            ADD CONSTRAINT "FK_6d3141f0ed17871ec2f10976ffa" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "genres_books_books"
            ADD CONSTRAINT "FK_9690986762184b989cc03c41edf" FOREIGN KEY ("genres_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "genres_books_books"
            ADD CONSTRAINT "FK_1160d4a23baf2a8d8ac2e89d6e6" FOREIGN KEY ("books_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres"
            ADD CONSTRAINT "FK_b1f16cfd502b1c038223f42f1b5" FOREIGN KEY ("books_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres"
            ADD CONSTRAINT "FK_5394ae1babdaf4f0bffe7116cad" FOREIGN KEY ("genres_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_5394ae1babdaf4f0bffe7116cad"
        `);
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_b1f16cfd502b1c038223f42f1b5"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres_books_books" DROP CONSTRAINT "FK_1160d4a23baf2a8d8ac2e89d6e6"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres_books_books" DROP CONSTRAINT "FK_9690986762184b989cc03c41edf"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_loans" DROP CONSTRAINT "FK_6d3141f0ed17871ec2f10976ffa"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_loans" DROP CONSTRAINT "FK_c54283a3ac15202f0decd43cbaf"
        `);
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "FK_1056dbee4616479f7d562c562df"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_5394ae1babdaf4f0bffe7116ca"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b1f16cfd502b1c038223f42f1b"
        `);
        await queryRunner.query(`
            DROP TABLE "books_genres_genres"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1160d4a23baf2a8d8ac2e89d6e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9690986762184b989cc03c41ed"
        `);
        await queryRunner.query(`
            DROP TABLE "genres_books_books"
        `);
        await queryRunner.query(`
            DROP TABLE "book_loans"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "books"
        `);
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
        await queryRunner.query(`
            DROP TABLE "authors"
        `);
    }

}
