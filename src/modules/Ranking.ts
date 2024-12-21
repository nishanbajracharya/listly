class Ranking {
  private items: string[];
  public matches: string[][];
  public state: Record<string, number>;
  public winnerMap: Map<string, string[]> = new Map();
  public completedMatches: string[][] = [];

  constructor(items: string[]) {
    this.items = items;

    this.matches = this.getMatches(this.items);

    items.forEach((item) => {
      this.winnerMap.set(item, []);
    });

    this.state = this.items.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {} as Record<string, number>);
  }

  getMatches(list: string[]) {
    return list
      .map((item, index) => {
        const matches = list
          .slice(index + 1)
          .map((match) => [item, match].sort(() => Math.random() - 0.5));
        return matches;
      })
      .flat()
      .sort(() => Math.random() - 0.5);
  }

  runMatch(winner: string, loser: string, recursive = false) {
    this.state[winner] += 1;

    // remove the match from the list
    this.matches = this.matches.filter(
      ([a, b]) =>
        !(a === winner && b === loser) && !(a === loser && b === winner)
    );

    this.completedMatches.push([winner, loser]);

    this.winnerMap.get(winner)?.push(loser);

    if (this.matches.length > 0 && recursive) {
      const losersOfLoser = this.winnerMap.get(loser);

      if (losersOfLoser && losersOfLoser.length > 0) {
        losersOfLoser.forEach((loserOfLoser) => {
          // check if the loser of the loser has already lost to the winner
          if (
            this.completedMatches.some(
              ([a, b]) => a === winner && b === loserOfLoser
            )
          ) {
            return;
          }
          this.runMatch(winner, loserOfLoser);
        });
      }
    }
  }

  getMatch() {
    return this.matches[0];
  }

  getResult() {
    const sortedResults = Object.entries(this.state).sort(
      ([, a], [, b]) => b - a
    );
    return sortedResults.map(([item]) => item);
  }
}

export default Ranking;
