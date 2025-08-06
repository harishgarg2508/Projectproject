import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedScore1754457887053 implements MigrationInterface {
    name = 'AddedScore1754457887053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" ADD "score" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "score"`);
    }

}
