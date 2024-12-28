import React from 'react';
import { Router } from 'wouter';
import { describe, it, expect, vi } from 'vitest';

import { l } from '../../src/modules/language';
import Rank from '../../src/components/pages/Rank';
import { encode } from '../../src/modules/encoding';
import en from '../../src/constants/localization/en.json';
import { render, screen, fireEvent } from '../../test-utils';

describe('Rank component', () => {
  const list = ['A', 'B', 'C'];
  const listString = list.join('\n');
  const encodedList = encode(
    JSON.stringify({
      data: listString,
      source: 'listly',
    })
  );

  it('should render empty Rank component', () => {
    render(
      <Router base="/listly">
        <Rank />
      </Router>
    );

    expect(screen.getByText(l(en['page.rank.title']))).toBeInTheDocument();
    expect(screen.getByText(l(en['page.rank.empty']))).toBeInTheDocument();

    const goToHomeButton = screen.getByLabelText('Go to home button');
    fireEvent.click(goToHomeButton);

    expect(location.pathname).to.eq('/listly/');
  });

  it('shold render filled Rank component', () => {
    const spy = vi.spyOn(navigator.clipboard, 'writeText');
    localStorage.setItem('list', JSON.stringify(list));

    render(<Rank />);

    expect(
      screen.getAllByText(l(en['page.rank.title']))[0]
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Rank table')).toBeInTheDocument();

    const copyButton = screen.getByLabelText('Copy button');
    fireEvent.click(copyButton);

    expect(spy).toHaveBeenLastCalledWith(listString);

    const shareButton = screen.getByLabelText('Share button');
    fireEvent.click(shareButton);
    expect(spy).toHaveBeenLastCalledWith(
      `http://localhost:3000/listly/?rank=${encodedList}`
    );
  });
});
