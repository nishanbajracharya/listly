import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import {
  Container,
  Text,
  Button,
  UnstyledButton,
  Card,
  Flex,
} from '@mantine/core';

import { l } from '../../../modules/language';
import { Link } from 'wouter';

function Compare() {
  const [list, setList] = useLocalStorage<string[]>({
    key: 'list',
    defaultValue: [],
  });

  const [gameState, setGameState] = useState<'START' | 'RUNNING' | 'DONE'>(
    'START'
  );
  const [matchIndex, setMatchIndex] = useState(-1);
  const [matches, setMatches] = useState<string[][]>([]);
  const [results, setResults] = useState<Record<string, number>>({});

  useEffect(() => {
    // Generate matches
    const generatedMatches = randomizeMatches(getMatches(list));
    setMatches(generatedMatches);

    const state = list.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {} as Record<string, number>);
    setResults(state);
  }, [list]);

  // return unique grouping of each item with other in a pair of two
  function getMatches(list: string[]) {
    return list
      .map((item, index) => {
        const matches = list.slice(index + 1).map((match) => [item, match]);
        return matches;
      })
      .flat();
  }

  // return randomized matches
  function randomizeMatches(matches: string[][]) {
    return matches.sort(() => Math.random() - 0.5);
  }

  function runMatch(selected: string) {
    const [a, b] = matches[matchIndex];

    // Update results
    if (selected === a) {
      results[a] += 1;
      results[b] -= 1;
    } else {
      results[a] -= 1;
      results[b] += 1;
    }

    setResults(results);
    setMatchIndex((index) => index + 1);

    // Check if all matches are done
    if (matchIndex === matches.length - 1) {
      setGameState('DONE');

      // Save results
      const sortedResults = Object.entries(results).sort(
        ([, a], [, b]) => b - a
      );
      const rankedList = sortedResults.map(([item]) => item);

      setList(rankedList);
    }
  }

  function startComparison() {
    setGameState('RUNNING');
    setMatchIndex(0);
  }

  return (
    <Container>
      <Text size="xl" fw={700} mb="md">
        {l('page.compare.title')}
      </Text>
      <Text size="md" mb="lg">
        {l('page.compare.description')}
      </Text>
      {gameState === 'START' && (
        <Button
          variant="filled"
          color="blue"
          fullWidth
          onClick={startComparison}
        >
          {l('page.compare.button.start')}
        </Button>
      )}
      {gameState === 'RUNNING' && (
        <>
          <Text fw={700}>
            {l('page.compare.start.title')} ({matchIndex + 1}/{matches.length})
          </Text>
          <Flex my="lg" gap="md" direction={{ base: 'column', md: 'row' }}>
            <UnstyledButton
              flex="1"
              onClick={() => runMatch(matches[matchIndex]?.[0])}
            >
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                {matches[matchIndex]?.[0]}
              </Card>
            </UnstyledButton>
            <UnstyledButton
              flex="1"
              onClick={() => runMatch(matches[matchIndex]?.[1])}
            >
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                {matches[matchIndex]?.[1]}
              </Card>
            </UnstyledButton>
          </Flex>
        </>
      )}
      {gameState === 'DONE' && (
        <>
          <Text fw={700}>{l('page.compare.done.title')}</Text>
          <Link href="/rank" asChild>
            <Button
              variant="filled"
              color="blue"
              fullWidth
              onClick={startComparison}
              my="lg"
            >
              {l('page.compare.button.complete')}
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default Compare;
