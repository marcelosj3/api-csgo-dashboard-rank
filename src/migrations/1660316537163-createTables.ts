import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1660316537163 implements MigrationInterface {
  name = "createTables1660316537163";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "multikills" ("multikillId" uuid NOT NULL DEFAULT uuid_generate_v4(), "_1k" integer NOT NULL, "_2k" integer NOT NULL, "_3k" integer NOT NULL, "_4k" integer NOT NULL, "_5k" integer NOT NULL, CONSTRAINT "PK_f4ff1f613edecd944a208680eb9" PRIMARY KEY ("multikillId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "player_matches" ("playerMatchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team" character varying NOT NULL, "kills" integer NOT NULL, "deaths" integer NOT NULL, "assists" integer NOT NULL, "killDeathDifference" integer NOT NULL, "killDeathRatio" double precision NOT NULL, "averageDamagePerRound" double precision NOT NULL, "headshotPercentage" double precision NOT NULL, "kast" double precision NOT NULL, "enemiesFlashed" integer NOT NULL, "flashAssists" integer NOT NULL, "enemiesBlindTime" double precision NOT NULL DEFAULT '0', "utilityDamage" integer NOT NULL DEFAULT '0', "clutch1vx" integer NOT NULL, "tradeKills" integer NOT NULL, "multikillMultikillId" uuid, "playerPlayerId" character varying, "matchMatchId" uuid, CONSTRAINT "PK_d118812064e8c740d77de80473a" PRIMARY KEY ("playerMatchId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "players" ("playerId" character varying NOT NULL, "name" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_7aefa05088ed891a31b5c6cdc49" PRIMARY KEY ("playerId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "platform_credentials" ("platformCredentialsId" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformPlayerId" character varying NOT NULL, "platformPlatformId" uuid, "playersPlayerId" character varying, CONSTRAINT "UQ_c9f23124c7101b0165e4bab5e26" UNIQUE ("platformPlayerId"), CONSTRAINT "PK_0950a7a9bf3ef88e991222a1ce0" PRIMARY KEY ("platformCredentialsId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "platforms" ("platformId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_bb8c1a830dc18d62ec98b8102fd" PRIMARY KEY ("platformId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "scoreboards" ("scoreboardId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team1Rounds" integer NOT NULL, "team2Rounds" integer NOT NULL, CONSTRAINT "PK_d978559dadac2117fcb28d40853" PRIMARY KEY ("scoreboardId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "matches" ("matchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformMatchId" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "mapName" character varying NOT NULL, "matchUrl" character varying NOT NULL, "scoreboardScoreboardId" uuid, "platformPlatformId" uuid, CONSTRAINT "PK_00f0b0a807779364b0671ff5a35" PRIMARY KEY ("matchId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "player_matches" ADD CONSTRAINT "FK_56b97f82d2d2a041736202c27b0" FOREIGN KEY ("multikillMultikillId") REFERENCES "multikills"("multikillId") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "player_matches" ADD CONSTRAINT "FK_f2aef7c3d84917ecc9bfcb88e4c" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("playerId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "player_matches" ADD CONSTRAINT "FK_28fccb42381e8baf4156b38ce5b" FOREIGN KEY ("matchMatchId") REFERENCES "matches"("matchId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "platform_credentials" ADD CONSTRAINT "FK_f552c5fbc59fc287f5e97fe60db" FOREIGN KEY ("platformPlatformId") REFERENCES "platforms"("platformId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "platform_credentials" ADD CONSTRAINT "FK_76dc25300cc9de531b6815d77f7" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("playerId") ON DELETE CASCADE ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE "platform_credentials" DROP CONSTRAINT "FK_76dc25300cc9de531b6815d77f7"`
    );
    await queryRunner.query(
      `ALTER TABLE "platform_credentials" DROP CONSTRAINT "FK_f552c5fbc59fc287f5e97fe60db"`
    );
    await queryRunner.query(
      `ALTER TABLE "player_matches" DROP CONSTRAINT "FK_28fccb42381e8baf4156b38ce5b"`
    );
    await queryRunner.query(
      `ALTER TABLE "player_matches" DROP CONSTRAINT "FK_f2aef7c3d84917ecc9bfcb88e4c"`
    );
    await queryRunner.query(
      `ALTER TABLE "player_matches" DROP CONSTRAINT "FK_56b97f82d2d2a041736202c27b0"`
    );
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TABLE "scoreboards"`);
    await queryRunner.query(`DROP TABLE "platforms"`);
    await queryRunner.query(`DROP TABLE "platform_credentials"`);
    await queryRunner.query(`DROP TABLE "players"`);
    await queryRunner.query(`DROP TABLE "player_matches"`);
    await queryRunner.query(`DROP TABLE "multikills"`);
  }
}
