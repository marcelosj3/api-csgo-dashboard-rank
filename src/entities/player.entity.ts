import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PlatformCredentials } from "./platform-credentials";
import { PlayerMatch } from "./player-match.entity";

@Entity("players")
export class Player {
  @PrimaryGeneratedColumn("uuid")
  readonly playerId?: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @ManyToMany(
    () => PlatformCredentials,
    (platformCredentials) => platformCredentials.players,
    { onDelete: "CASCADE" }
  )
  @JoinTable()
  platformCredentials: PlatformCredentials[];

  @OneToMany(() => PlayerMatch, (playerMatch) => playerMatch.player, {
    eager: true,
    onDelete: "CASCADE",
  })
  playerMatches: PlayerMatch[];
}
