import { MigrationInterface, QueryRunner } from "typeorm";

export class Votetypeunique1754467500299 implements MigrationInterface {
    name = 'Votetypeunique1754467500299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_a9274181b38e8f8ae39001d540b"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_a840558d3c1e3975ba5d67e7cd8" UNIQUE ("userId", "feedbackId", "voteType")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_a840558d3c1e3975ba5d67e7cd8"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_a9274181b38e8f8ae39001d540b" UNIQUE ("userId", "feedbackId")`);
    }

}
