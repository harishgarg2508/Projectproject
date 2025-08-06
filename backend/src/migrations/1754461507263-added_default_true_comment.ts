import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDefaultTrueComment1754461507263 implements MigrationInterface {
    name = 'AddedDefaultTrueComment1754461507263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "is_visible" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "is_visible" DROP DEFAULT`);
    }

}
