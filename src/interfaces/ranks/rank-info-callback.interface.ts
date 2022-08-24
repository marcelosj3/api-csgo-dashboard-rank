import { PlayerMatch } from "../../entities";

export type IRankInfoCallback<T> = (playerMatch: PlayerMatch) => T;
