import { useEffect } from 'react';
import { CiDark } from 'react-icons/ci';
import { CiLight } from 'react-icons/ci';
import { PiRanking } from 'react-icons/pi';
import { useDisclosure } from '@mantine/hooks';
import {
  Text,
  Group,
  Burger,
  AppShell,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';

import { language } from '../../modules/language';

import Nav from '../Router/Nav';
import RouteSwitch from '../Router/RouteSwitch';

function Shell() {
  const [opened, { toggle }] = useDisclosure();

  const { setColorScheme, clearColorScheme, colorScheme, toggleColorScheme } =
    useMantineColorScheme();

  useEffect(() => {
    setColorScheme(colorScheme);
    return () => {
      clearColorScheme();
    };
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <PiRanking size={30} />
          <Text size="xl" ml="sm" flex={1}>
            {language('base.app.title')}
          </Text>
          <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
            {colorScheme === 'light' ? (
              <CiDark size={25} />
            ) : (
              <CiLight size={25} />
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>
        <RouteSwitch />
      </AppShell.Main>
    </AppShell>
  );
}

export default Shell;
