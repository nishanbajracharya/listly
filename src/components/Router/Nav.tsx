import { NavLink } from '@mantine/core';
import { Link, useLocation } from 'wouter';

import routes from '../../constants/config/route';

function Nav() {
  const [location] = useLocation();

  return (
    <>
      {Object.values(routes).map((route) => (
        <Link asChild href={route.path} key={route.path}>
          <NavLink
            label={route.label}
            active={location === route.path}
            leftSection={<route.Icon />}
            aria-label={`${route.label} link`}
          />
        </Link>
      ))}
    </>
  );
}

export default Nav;
