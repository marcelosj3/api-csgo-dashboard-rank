import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Match } from "./match.entity";
import { PlatformCredentials } from "./platform-credentials";

@Entity("players")
export class Player {
  @PrimaryGeneratedColumn("uuid")
  readonly playerId?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToMany(
    () => PlatformCredentials,
    (platformCredentials) => platformCredentials.players,
    { onDelete: "CASCADE" }
  )
  @JoinTable()
  platformCredentials: PlatformCredentials[];

  @ManyToMany(() => Match, (match) => match.players)
  matches: Match[];
}
