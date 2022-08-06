import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { PlatformNames } from "../enums";

import { Match } from "./match.entity";
import { PlatformCredentials } from "./platform-credentials";

@Entity("platforms")
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  readonly platformId?: string;

  @Column()
  name: PlatformNames;

  @OneToMany(() => Match, (match) => match.platform)
  matches: Match[];

  @OneToMany(
    () => PlatformCredentials,
    (platformCredentials) => platformCredentials.platformCredentialsId
  )
  platformCredentials: PlatformCredentials[];
}
