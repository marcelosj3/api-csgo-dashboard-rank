export const removeDuplicates = <T extends { name?: string }>(
  rankInfo: T[]
) => {
  return rankInfo.filter(
    (player, index) =>
      index ===
      rankInfo.findIndex((playerIndex) => player.name === playerIndex.name)
  );
};
