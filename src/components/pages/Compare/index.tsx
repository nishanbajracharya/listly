import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import {
  Text,
  Card,
  Flex,
  Group,
  Switch,
  Button,
  Tooltip,
  Container,
  UnstyledButton,
} from '@mantine/core';

import { l } from '../../../modules/language';
import Ranking from '../../../modules/Ranking';

function Compare() {
  const [list, setList] = useLocalStorage<string[]>({
    key: 'list',
    defaultValue: [],
  });

  const [gameState, setGameState] = useState<'START' | 'RUNNING' | 'DONE'>(
    'START'
  );
  const [match, setMatch] = useState<string[]>();
  const [ranking, setRanking] = useState<Ranking>();
  const [quickCompare, setQuickCompare] = useState(false);

  useEffect(() => {
    if (list && list.length > 0) {
      const ranking = new Ranking(list);
      setRanking(ranking);

      setMatch(ranking.getMatch());
    }
  }, [list]);

  function startComparison() {
    setGameState('RUNNING');
  }

  function runMatch(winner: string = '', loser: string = '') {
    if (ranking && winner && loser) {
      ranking.runMatch(winner, loser, quickCompare);

      const nextMatch = ranking.getMatch();

      if (!nextMatch) {
        setGameState('DONE');
        return setList(ranking.getResult());
      }

      setMatch(nextMatch);
    }
  }

  return (
    <Container>
      <Text size="xl" fw={700} mb="md">
        {l('page.compare.title')}
      </Text>
      {list && Array.isArray(list) && list.length > 1 ? (
        <>
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
              <Flex
                gap="md"
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align={{ base: 'flex-end', md: 'center' }}
              >
                <Text fw={700}>
                  {l('page.compare.start.title')} ({ranking?.matches.length}{' '}
                  {l('page.compare.matchesRemaining')})
                </Text>

                <Tooltip
                  multiline
                  w={320}
                  label={l('page.compare.tooltip')}
                  refProp="rootRef"
                >
                  <Switch
                    label={l('page.compare.start.switch')}
                    checked={quickCompare}
                    onChange={(event) =>
                      setQuickCompare(event.currentTarget.checked)
                    }
                  />
                </Tooltip>
              </Flex>
              <Flex my="lg" gap="md" direction={{ base: 'column', md: 'row' }}>
                {match?.map((value, index) => (
                  <UnstyledButton
                    flex="1"
                    key={value}
                    onClick={() =>
                      runMatch(
                        value,
                        match?.[index === 0 ? index + 1 : index - 1]
                      )
                    }
                  >
                    <Card
                      py="50px"
                      withBorder
                      ta="center"
                      radius="md"
                      shadow="sm"
                      padding="lg"
                    >
                      {value}
                    </Card>
                  </UnstyledButton>
                ))}
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
        </>
      ) : (
        <Group>
          <Text>{l('page.compare.empty')}</Text>
          <Link href="/" asChild>
            <Button variant="filled" color="blue" fullWidth>
              {l('page.compare.home')}
            </Button>
          </Link>
        </Group>
      )}
    </Container>
  );
}

export default Compare;
