import React from 'react';
import { describe, it, expect } from 'vitest';

import App from '../../src/App';
import { l } from '../../src/modules/language';
import { render, screen, fireEvent } from '../../test-utils';
import en from '../../src/constants/localization/en.json';

describe('App component', () => {
  it('renders App component', () => {
    const { container } = render(<App />);

    expect(screen.getByText(l(en['base.app.title']))).to.exist;
    expect(screen.getAllByText(l(en['shell.nav.home']))).to.exist;
    expect(screen.getAllByText(l(en['shell.nav.compare']))).to.exist;
    expect(screen.getAllByText(l(en['shell.nav.rank']))).to.exist;

    const compareButton = screen.getByLabelText(l(en['shell.nav.compare']));
    fireEvent.click(compareButton);
    expect(location.pathname).to.eq('/listly/compare');

    const rankButton = screen.getByLabelText(l(en['shell.nav.rank']));
    fireEvent.click(rankButton);
    expect(location.pathname).to.eq('/listly/rank');
    
    const homeButton = screen.getByLabelText(l(en['shell.nav.home']));
    fireEvent.click(homeButton);
    expect(location.pathname).to.eq('/listly/');
  });
});
