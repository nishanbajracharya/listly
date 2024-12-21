import { PiRanking } from 'react-icons/pi';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Text } from '@mantine/core';

import lang from '../../constants/localization/en.json';

import Nav from '../Router/Nav';

function Shell() {
  const [opened, { toggle }] = useDisclosure();

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
          <Text size="xl" ml="sm">
            {lang['base.app.title']}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}

export default Shell;
