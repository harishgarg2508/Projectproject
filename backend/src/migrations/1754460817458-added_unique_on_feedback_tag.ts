import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniqueOnFeedbackTag1754460817458 implements MigrationInterface {
    name = 'AddedUniqueOnFeedbackTag1754460817458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback_tag" ADD CONSTRAINT "UQ_721625e8c866d0d6453aeac55c3" UNIQUE ("feedbackId", "tagId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback_tag" DROP CONSTRAINT "UQ_721625e8c866d0d6453aeac55c3"`);
    }

}
