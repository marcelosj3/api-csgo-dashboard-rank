import { MigrationInterface, QueryRunner } from "typeorm";

export class matchPlatformAndScoreboardTables1659385585975
  implements MigrationInterface
{
  name = "matchPlatformAndScoreboardTables1659385585975";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "matches" ("matchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformMatchId" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "mapName" character varying NOT NULL, "matchUrl" character varying NOT NULL, CONSTRAINT "PK_00f0b0a807779364b0671ff5a35" PRIMARY KEY ("matchId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "platforms" ("platformId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_bb8c1a830dc18d62ec98b8102fd" PRIMARY KEY ("platformId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "scoreboards" ("scoreboardId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team1Rounds" integer NOT NULL, "team2Rounds" integer NOT NULL, "winner" integer NOT NULL, CONSTRAINT "PK_d978559dadac2117fcb28d40853" PRIMARY KEY ("scoreboardId"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "scoreboards"`);
    await queryRunner.query(`DROP TABLE "platforms"`);
    await queryRunner.query(`DROP TABLE "matches"`);
  }
}
