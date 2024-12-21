import { PiRanking } from 'react-icons/pi';
import { RiHome2Line } from 'react-icons/ri';
import { MdOutlineCompareArrows } from 'react-icons/md';

import { language } from '../../modules/language';

const routes = {
  HOME: {
    path: '/',
    label: language('shell.nav.home'),
    Icon: RiHome2Line,
  },
  COMPARE: {
    path: '/compare',
    label: language('shell.nav.compare'),
    Icon: MdOutlineCompareArrows,
  },
  RANK: {
    path: '/rank',
    label: language('shell.nav.rank'),
    Icon: PiRanking,
  },
};

export default routes;
