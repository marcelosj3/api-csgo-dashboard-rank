import { MigrationInterface, QueryRunner } from "typeorm";

export class platformPlayerId1659446076495 implements MigrationInterface {
    name = 'platformPlayerId1659446076495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platformCredentials" RENAME COLUMN "platformId" TO "platformPlayerId"`);
        await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "imageUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "imageUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "platformCredentials" RENAME COLUMN "platformPlayerId" TO "platformId"`);
    }

}
