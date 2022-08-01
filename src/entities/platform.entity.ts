import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { PlatformNames } from "../enums";

import { Match } from "./match.entity";

@Entity("platforms")
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  readonly platformId?: string;

  @Column({ nullable: false })
  name: PlatformNames;

  @ManyToOne(() => Match, (match) => match.platform)
  matches: Match[];
}
