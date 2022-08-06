import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { PlatformCredentials } from "./platform-credentials";
import { PlayerMatch } from "./player-match.entity";

@Entity("players")
export class Player {
  @PrimaryColumn()
  playerId: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @OneToMany(
    () => PlatformCredentials,
    (platformCredentials) => platformCredentials.players,
    { onDelete: "CASCADE" }
  )
  platformCredentials: PlatformCredentials[];

  @OneToMany(() => PlayerMatch, (playerMatch) => playerMatch.player, {
    onDelete: "CASCADE",
  })
  playerMatches: PlayerMatch[];
}
