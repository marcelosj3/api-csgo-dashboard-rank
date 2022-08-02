import { MigrationInterface, QueryRunner } from "typeorm";

export class matchPlatformAndScoreboardTable1659407108434
  implements MigrationInterface
{
  name = "matchPlatformAndScoreboardTable1659407108434";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "platforms" ("platformId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_bb8c1a830dc18d62ec98b8102fd" PRIMARY KEY ("platformId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "scoreboards" ("scoreboardId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team1Rounds" integer NOT NULL, "team2Rounds" integer NOT NULL, CONSTRAINT "PK_d978559dadac2117fcb28d40853" PRIMARY KEY ("scoreboardId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "matches" ("matchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformMatchId" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "mapName" character varying NOT NULL, "matchUrl" character varying NOT NULL, "scoreboardScoreboardId" uuid, "platformPlatformId" uuid, CONSTRAINT "UQ_e7e21d3de6af2cb3c7d8e3ea92c" UNIQUE ("platformMatchId"), CONSTRAINT "PK_00f0b0a807779364b0671ff5a35" PRIMARY KEY ("matchId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_f98128147947f30bd1fda08f53e" FOREIGN KEY ("scoreboardScoreboardId") REFERENCES "scoreboards"("scoreboardId") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_1604bde99fea82ab96d937ae41b" FOREIGN KEY ("platformPlatformId") REFERENCES "platforms"("platformId") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_1604bde99fea82ab96d937ae41b"`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_f98128147947f30bd1fda08f53e"`
    );
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TABLE "scoreboards"`);
    await queryRunner.query(`DROP TABLE "platforms"`);
  }
}
