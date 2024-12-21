import { Flex, Text, Tabs } from '@mantine/core';
import { Link, useLocation } from 'wouter';

import routes from '../../constants/config/route';

function Nav() {
  const [location] = useLocation();
  return (
    <Tabs defaultValue={routes.HOME.label} value={location} inverted>
      <Tabs.List grow>
        {Object.values(routes).map((route) => (
          <Link asChild href={route.path} key={route.path}>
            <Tabs.Tab value={route.path}>
              <Flex direction="column" align="center">
                <route.Icon size="24" />
                <Text>{route.label}</Text>
              </Flex>
            </Tabs.Tab>
          </Link>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

export default Nav;
