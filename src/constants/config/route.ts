import { PiRanking } from 'react-icons/pi';
import { RiHome2Line } from 'react-icons/ri';
import { MdOutlineCompareArrows } from 'react-icons/md';

import { l } from '../../modules/language';

const routes = {
  HOME: {
    path: '/',
    label: l('shell.nav.home'),
    Icon: RiHome2Line,
  },
  COMPARE: {
    path: '/compare',
    label: l('shell.nav.compare'),
    Icon: MdOutlineCompareArrows,
  },
  RANK: {
    path: '/rank',
    label: l('shell.nav.rank'),
    Icon: PiRanking,
  },
};

export default routes;
