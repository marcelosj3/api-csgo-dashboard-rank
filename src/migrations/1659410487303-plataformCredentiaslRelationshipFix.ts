import { MigrationInterface, QueryRunner } from "typeorm";

export class plataformCredentiaslRelationshipFix1659410487303 implements MigrationInterface {
    name = 'plataformCredentiaslRelationshipFix1659410487303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_e97a75a15f06e468cb447e1ab97"`);
        await queryRunner.query(`CREATE TABLE "players_platform_credentials_platform_credentials" ("playersPlayerId" uuid NOT NULL, "platformCredentialsPlatformCredentialsId" uuid NOT NULL, CONSTRAINT "PK_baf20f9f0f6e854972ad62f98e8" PRIMARY KEY ("playersPlayerId", "platformCredentialsPlatformCredentialsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45104fef618023e200f78eab2b" ON "players_platform_credentials_platform_credentials" ("playersPlayerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21b429f07e3ed13737eb0f71ce" ON "players_platform_credentials_platform_credentials" ("platformCredentialsPlatformCredentialsId") `);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "platformCredentialsPlatformCredentialsId"`);
        await queryRunner.query(`ALTER TABLE "players_platform_credentials_platform_credentials" ADD CONSTRAINT "FK_45104fef618023e200f78eab2bd" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("playerId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "players_platform_credentials_platform_credentials" ADD CONSTRAINT "FK_21b429f07e3ed13737eb0f71ceb" FOREIGN KEY ("platformCredentialsPlatformCredentialsId") REFERENCES "platformCredentials"("platformCredentialsId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players_platform_credentials_platform_credentials" DROP CONSTRAINT "FK_21b429f07e3ed13737eb0f71ceb"`);
        await queryRunner.query(`ALTER TABLE "players_platform_credentials_platform_credentials" DROP CONSTRAINT "FK_45104fef618023e200f78eab2bd"`);
        await queryRunner.query(`ALTER TABLE "players" ADD "platformCredentialsPlatformCredentialsId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b429f07e3ed13737eb0f71ce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45104fef618023e200f78eab2b"`);
        await queryRunner.query(`DROP TABLE "players_platform_credentials_platform_credentials"`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_e97a75a15f06e468cb447e1ab97" FOREIGN KEY ("platformCredentialsPlatformCredentialsId") REFERENCES "platformCredentials"("platformCredentialsId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
