import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveVoteUnique1754467734070 implements MigrationInterface {
    name = 'RemoveVoteUnique1754467734070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_a840558d3c1e3975ba5d67e7cd8"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_a9274181b38e8f8ae39001d540b" UNIQUE ("userId", "feedbackId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_a9274181b38e8f8ae39001d540b"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_a840558d3c1e3975ba5d67e7cd8" UNIQUE ("voteType", "userId", "feedbackId")`);
    }

}
