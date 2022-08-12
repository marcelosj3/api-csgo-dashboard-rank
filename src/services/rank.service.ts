import { Request } from "express";
import { PlayerMatch } from "../entities";

import { IRanksKills, IPlayerMatchSerializer } from "../interfaces";
import { PlayerMatchRepository } from "../repositories";
import { playerMatchSerializer } from "../serializers";

type IMapCallback<T> = (player: IPlayerMatchSerializer) => T;
type TOrderBy<T> = { [P in keyof T]: "ASC" | "DESC" | undefined };

class RankService {
  getRankInfo = async <T, S>(
    mapCallback: (player: PlayerMatch) => T,
    order: TOrderBy<T>
  ) => {
    const playerMatches: PlayerMatch[] =
      await PlayerMatchRepository.findAllRank();

    console.log("-".repeat(50));
    console.log();
    console.log(playerMatches);
    console.log();
    console.log("-".repeat(50));

    // playerMatches.map(mapCallback).sort((playerA, playerB) => {
    //   const sorts = Object.entries(order);

    //   const [key, value] = sorts[0];
    //   const sortValue = value === "ASC" ? 1 : value === "DESC" ? -1 : 0;

    //   const pA = playerA[key as keyof T];
    //   const pB = playerB[key as keyof T];

    //   if (pA > pB) return sortValue;
    //   if (pA < pB) return sortValue;

    //   return 0;
    // });

    return playerMatches;
  };

  getKills = async ({ query }: Request) => {
    const includeMatchUrl = query.hasOwnProperty("match_url");

    const order: TOrderBy<IRanksKills> = { kills: "DESC", player: undefined };

    const playersInfo: IMapCallback<IRanksKills> = (player) => ({
      name: player.player,
      kills: player.kills,
    });

    const playerByKills = await this.getRankInfo<IRanksKills>(
      playersInfo,
      order
    );

    return { status: 200, message: playerByKills };
  };
}

export default new RankService();
