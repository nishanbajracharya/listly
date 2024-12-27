import { describe, it, expect, beforeAll } from 'vitest';

import Ranking from '../../src/modules/Ranking';

describe('Ranking tests', () => {
	let ranking: Ranking;
	let list: string[];

	beforeAll(() => {
    // Array from A to Z
		list = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));;

		ranking = new Ranking(list);
	});

	it('should have correct number of rounds', () => {
		const matches = ranking.matches;
		const listLength = list.length;

		const expectedCount = listLength * (listLength - 1) / 2;

		expect(matches).toBeDefined();
		expect(Array.isArray(matches)).to.eq(true);
		expect(matches.length).to.eq(expectedCount);
	});

	it('should randomize matches', () => {
		const oldMatches = ranking.matches;

		const newRanking = new Ranking(list);

		const newMatches = newRanking.matches;

		expect(oldMatches).to.not.deep.eq(newMatches);
	});

	it('should run a match', () => {
		const match = ranking.getMatch();

		const first = match[0];
		const second = match[1];

		ranking.runMatch(first, second);

		expect(ranking.state[first]).to.eq(1);
		expect(ranking.state[second]).to.eq(0);

		const listLength = list.length;
		// One match is already played
		const expectedCount = listLength * (listLength - 1) / 2 - 1;

		expect(ranking.matches.length).to.eq(expectedCount);

		// Played match should not exist in remaining matches
		const playedMatchStillRemaining = ranking.matches.find(
			([a, b]) =>
				(a === first && b === second) || (a === second && b === first)
		);

		expect(playedMatchStillRemaining).toBeUndefined();
	});

	it('should play all matches', () => {
		ranking = new Ranking(list);

		while (ranking.matches.length > 0) {
			const matchesLength = ranking.matches.length;

			const match = ranking.getMatch();

			const first = match[0];
			const second = match[1];

			const firstScore = ranking.state[first];
			const secondScore = ranking.state[second];

			ranking.runMatch(first, second);

			expect(ranking.state[first]).to.eq(firstScore + 1);
			expect(ranking.state[second]).to.eq(secondScore);

			expect(ranking.matches.length).to.eq(matchesLength - 1);
		}

		const result = ranking.getResult();

		expect(list.length).to.eq(result.length);

		expect(list).toEqual(expect.arrayContaining(result));
	});

  it('should run matches using recursive flag', () => {
    ranking = new Ranking(list);
		const listLength = list.length;

    const totalCountWithoutRecursive = listLength * (listLength - 1) / 2;

    let matchesPlayed = 0;

		while (ranking.matches.length > 0) {
			const match = ranking.getMatch();

			const first = match[0];
			const second = match[1];

			const firstScore = ranking.state[first];
			const secondScore = ranking.state[second];

			ranking.runMatch(first, second, true);

			expect(ranking.state[first]).to.be.greaterThanOrEqual(firstScore + 1);
			expect(ranking.state[second]).to.eq(secondScore);
      
      matchesPlayed++;
		}
    
    expect(matchesPlayed).to.be.lessThanOrEqual(totalCountWithoutRecursive);
  });
});
