import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerMatch } from "./player-match.entity";

@Entity("multikills")
export class Multikill {
  @PrimaryGeneratedColumn("uuid")
  readonly multikillId?: string;

  @Column({ type: "int" })
  _1k: number;

  @Column({ type: "int" })
  _2k: number;

  @Column({ type: "int" })
  _3k: number;

  @Column({ type: "int" })
  _4k: number;

  @Column({ type: "int" })
  _5k: number;

  @OneToMany(() => PlayerMatch, (playerMatch) => playerMatch.multikill, {
    eager: true,
  })
  playerMatches: PlayerMatch[];
}
