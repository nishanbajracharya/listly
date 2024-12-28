import React from 'react';
import { describe, it, expect } from 'vitest';

import App from '../../src/App';
import { l } from '../../src/modules/language';
import { render, screen, fireEvent } from '../../test-utils';
import en from '../../src/constants/localization/en.json';

describe('App component', () => {
  const navigation = [
    {
      lang: 'shell.nav.home',
      path: '/listly/',
    },
    {
      lang: 'shell.nav.compare',
      path: '/listly/compare',
    },
    {
      lang: 'shell.nav.rank',
      path: '/listly/rank',
    },
  ];

  it('renders App component', () => {
    render(<App />);

    expect(screen.getByText(l(en['base.app.title']))).toBeInTheDocument();

    navigation.forEach((nav) => {
      screen
        .getAllByText(l(en[nav.lang]))
        .forEach((node) => expect(node).toBeInTheDocument());

      const navButton = screen.getByLabelText(l(en[nav.lang]));
      fireEvent.click(navButton);
      expect(location.pathname).to.eq(nav.path);
    });

    const colorSchemeButton = screen.getByLabelText('Color Scheme Button');
    expect(colorSchemeButton).toBeInTheDocument();
    fireEvent.click(colorSchemeButton);
  });
});
