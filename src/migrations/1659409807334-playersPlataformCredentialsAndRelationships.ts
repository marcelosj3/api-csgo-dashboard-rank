import { MigrationInterface, QueryRunner } from "typeorm";

export class playersPlataformCredentialsAndRelationships1659409807334
  implements MigrationInterface
{
  name = "playersPlataformCredentialsAndRelationships1659409807334";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "players" ("playerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "imageUrl" character varying NOT NULL, "platformCredentialsPlatformCredentialsId" uuid, CONSTRAINT "PK_7aefa05088ed891a31b5c6cdc49" PRIMARY KEY ("playerId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "platformCredentials" ("platformCredentialsId" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformId" character varying NOT NULL, CONSTRAINT "PK_c59755096620a055fc43a625757" PRIMARY KEY ("platformCredentialsId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "matches_players_players" ("matchesMatchId" uuid NOT NULL, "playersPlayerId" uuid NOT NULL, CONSTRAINT "PK_2db4a00e0ec53f3ee05c87c3fda" PRIMARY KEY ("matchesMatchId", "playersPlayerId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82d5abfde033a48baa7a3c1a46" ON "matches_players_players" ("matchesMatchId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_212d9603bcee991dc5d9f0fffd" ON "matches_players_players" ("playersPlayerId") `
    );
    await queryRunner.query(
      `ALTER TABLE "platforms" ADD "platformCredentialsPlatformCredentialsId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_e97a75a15f06e468cb447e1ab97" FOREIGN KEY ("platformCredentialsPlatformCredentialsId") REFERENCES "platformCredentials"("platformCredentialsId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "platforms" ADD CONSTRAINT "FK_709bd00d48431c3a6dee95e48de" FOREIGN KEY ("platformCredentialsPlatformCredentialsId") REFERENCES "platformCredentials"("platformCredentialsId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "matches_players_players" ADD CONSTRAINT "FK_82d5abfde033a48baa7a3c1a46b" FOREIGN KEY ("matchesMatchId") REFERENCES "matches"("matchId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "matches_players_players" ADD CONSTRAINT "FK_212d9603bcee991dc5d9f0fffdd" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "matches_players_players" DROP CONSTRAINT "FK_212d9603bcee991dc5d9f0fffdd"`
    );
    await queryRunner.query(
      `ALTER TABLE "matches_players_players" DROP CONSTRAINT "FK_82d5abfde033a48baa7a3c1a46b"`
    );
    await queryRunner.query(
      `ALTER TABLE "platforms" DROP CONSTRAINT "FK_709bd00d48431c3a6dee95e48de"`
    );
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "FK_e97a75a15f06e468cb447e1ab97"`
    );
    await queryRunner.query(
      `ALTER TABLE "platforms" DROP COLUMN "platformCredentialsPlatformCredentialsId"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_212d9603bcee991dc5d9f0fffd"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_82d5abfde033a48baa7a3c1a46"`
    );
    await queryRunner.query(`DROP TABLE "matches_players_players"`);
    await queryRunner.query(`DROP TABLE "platformCredentials"`);
    await queryRunner.query(`DROP TABLE "players"`);
  }
}
