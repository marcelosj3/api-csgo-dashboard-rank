import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1659809301851 implements MigrationInterface {
  name = "createTables1659809301851";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "multikills" ("multikillId" uuid NOT NULL DEFAULT uuid_generate_v4(), "_1k" integer NOT NULL, "_2k" integer NOT NULL, "_3k" integer NOT NULL, "_4k" integer NOT NULL, "_5k" integer NOT NULL, CONSTRAINT "PK_f4ff1f613edecd944a208680eb9" PRIMARY KEY ("multikillId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "playersMatches" ("playerMatchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team" character varying NOT NULL, "kills" integer NOT NULL, "deaths" integer NOT NULL, "assists" integer NOT NULL, "killDeathDifference" integer NOT NULL, "killDeathRatio" double precision NOT NULL, "averageDamagePerRound" double precision NOT NULL, "headshotPercentage" double precision NOT NULL, "kast" double precision NOT NULL, "enemiesFlashed" integer NOT NULL, "flashAssists" integer NOT NULL, "enemiesBlindTime" double precision NOT NULL DEFAULT '0', "utilityDamage" integer NOT NULL DEFAULT '0', "clutch1vx" integer NOT NULL, "tradeKills" integer NOT NULL, "multikillMultikillId" uuid, "playerPlayerId" character varying, CONSTRAINT "PK_dba0c132763e66bd6341d50ea11" PRIMARY KEY ("playerMatchId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "players" ("playerId" character varying NOT NULL, "name" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_7aefa05088ed891a31b5c6cdc49" PRIMARY KEY ("playerId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "platformCredentials" ("platformCredentialsId" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformPlayerId" character varying NOT NULL, "platformNamesPlatformId" uuid, "playersPlayerId" character varying, CONSTRAINT "UQ_e2f465ab4ceee9a9ea6fdc03cb2" UNIQUE ("platformPlayerId"), CONSTRAINT "PK_c59755096620a055fc43a625757" PRIMARY KEY ("platformCredentialsId"))`
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
      `CREATE TABLE "matches_player_matches_players_matches" ("matchesMatchId" uuid NOT NULL, "playersMatchesPlayerMatchId" uuid NOT NULL, CONSTRAINT "PK_196bfd9a93c9d6cb9c12e4c835b" PRIMARY KEY ("matchesMatchId", "playersMatchesPlayerMatchId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99734e8222fdfa7b6ec4dc38e1" ON "matches_player_matches_players_matches" ("matchesMatchId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2db37f148c14f6346faef9ebf0" ON "matches_player_matches_players_matches" ("playersMatchesPlayerMatchId") `
    );
    await queryRunner.query(
      `ALTER TABLE "playersMatches" ADD CONSTRAINT "FK_ed65cd5b7a36caca9dc9f56c6a7" FOREIGN KEY ("multikillMultikillId") REFERENCES "multikills"("multikillId") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "playersMatches" ADD CONSTRAINT "FK_4907b951d0dd7233814673a60e7" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("playerId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "platformCredentials" ADD CONSTRAINT "FK_b0d81b32dfab6c23bfd7329f702" FOREIGN KEY ("platformNamesPlatformId") REFERENCES "platforms"("platformId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "platformCredentials" ADD CONSTRAINT "FK_27ff6fc25e707c7c0ac839275e4" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("playerId") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_f98128147947f30bd1fda08f53e" FOREIGN KEY ("scoreboardScoreboardId") REFERENCES "scoreboards"("scoreboardId") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_1604bde99fea82ab96d937ae41b" FOREIGN KEY ("platformPlatformId") REFERENCES "platforms"("platformId") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "matches_player_matches_players_matches" ADD CONSTRAINT "FK_99734e8222fdfa7b6ec4dc38e1e" FOREIGN KEY ("matchesMatchId") REFERENCES "matches"("matchId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "matches_player_matches_players_matches" ADD CONSTRAINT "FK_2db37f148c14f6346faef9ebf05" FOREIGN KEY ("playersMatchesPlayerMatchId") REFERENCES "playersMatches"("playerMatchId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "matches_player_matches_players_matches" DROP CONSTRAINT "FK_2db37f148c14f6346faef9ebf05"`
    );
    await queryRunner.query(
      `ALTER TABLE "matches_player_matches_players_matches" DROP CONSTRAINT "FK_99734e8222fdfa7b6ec4dc38e1e"`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_1604bde99fea82ab96d937ae41b"`
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_f98128147947f30bd1fda08f53e"`
    );
    await queryRunner.query(
      `ALTER TABLE "platformCredentials" DROP CONSTRAINT "FK_27ff6fc25e707c7c0ac839275e4"`
    );
    await queryRunner.query(
      `ALTER TABLE "platformCredentials" DROP CONSTRAINT "FK_b0d81b32dfab6c23bfd7329f702"`
    );
    await queryRunner.query(
      `ALTER TABLE "playersMatches" DROP CONSTRAINT "FK_4907b951d0dd7233814673a60e7"`
    );
    await queryRunner.query(
      `ALTER TABLE "playersMatches" DROP CONSTRAINT "FK_ed65cd5b7a36caca9dc9f56c6a7"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2db37f148c14f6346faef9ebf0"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99734e8222fdfa7b6ec4dc38e1"`
    );
    await queryRunner.query(
      `DROP TABLE "matches_player_matches_players_matches"`
    );
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TABLE "scoreboards"`);
    await queryRunner.query(`DROP TABLE "platforms"`);
    await queryRunner.query(`DROP TABLE "platformCredentials"`);
    await queryRunner.query(`DROP TABLE "players"`);
    await queryRunner.query(`DROP TABLE "playersMatches"`);
    await queryRunner.query(`DROP TABLE "multikills"`);
  }
}
