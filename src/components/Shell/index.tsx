import { useEffect } from 'react';
import { CiDark } from 'react-icons/ci';
import { CiLight } from 'react-icons/ci';
import { PiRanking } from 'react-icons/pi';
import {
  Text,
  Group,
  Tooltip,
  AppShell,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';

import { l } from '../../modules/language';

import Nav from '../Router/Nav';
import BottomNav from '../Router/BottomNav';
import RouteSwitch from '../Router/RouteSwitch';

function Shell() {
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
        collapsed: {
          desktop: false,
          mobile: true
        }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <PiRanking size={30} />
          <Text size="xl" ml="sm" flex={1}>
            {l('base.app.title')}
          </Text>
          <Tooltip
            label={
              colorScheme === 'light'
                ? l('shell.darkMode')
                : l('shell.lightMode')
            }
          >
            <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
              {colorScheme === 'light' ? (
                <CiDark size={25} />
              ) : (
                <CiLight size={25} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>
        <RouteSwitch />
      </AppShell.Main>
      <AppShell.Footer hiddenFrom="sm" withBorder={false}>
        <BottomNav />
      </AppShell.Footer>
    </AppShell>
  );
}

export default Shell;
