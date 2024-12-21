import { NavLink } from '@mantine/core';
import { Link, useLocation } from 'wouter';
import { PiRanking } from 'react-icons/pi';
import { RiHome2Line } from 'react-icons/ri';
import { MdOutlineCompareArrows } from 'react-icons/md';

import { language } from '../../modules/language';

const routes = {
  HOME: {
    path: '/',
    label: language('shell.nav.home'),
    icon: <RiHome2Line />,
  },
  COMPARE: {
    path: '/compare',
    label: language('shell.nav.compare'),
    icon: <MdOutlineCompareArrows />,
  },
  RANK: {
    path: '/rank',
    label: language('shell.nav.rank'),
    icon: <PiRanking />,
  },
};

function Nav() {
  const [location] = useLocation();

  return (
    <>
      {Object.values(routes).map((route) => (
        <Link asChild href={route.path} key={route.path}>
          <NavLink
            label={route.label}
            active={location === route.path}
            leftSection={route.icon}
          />
        </Link>
      ))}
    </>
  );
}

export default Nav;
