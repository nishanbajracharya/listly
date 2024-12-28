import React from 'react';
import { Router, Link } from 'wouter';
import { describe, it, expect, vi } from 'vitest';

import Shell from '../../src/components/Shell';
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

  it('should render filled Rank component', () => {
    let copiedText = '';
    const spy = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementation((data) => {
        copiedText = data;

        return Promise.resolve();
      });
    localStorage.setItem('list', JSON.stringify(list));

    render(
      <Router base="/listly">
        <Rank />
      </Router>
    );

    expect(
      screen.getAllByText(l(en['page.rank.title']))[0]
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Rank table')).toBeInTheDocument();

    const copyButton = screen.getByLabelText('Copy button');
    fireEvent.click(copyButton);

    expect(spy).toHaveBeenLastCalledWith(listString);

    const shareButton = screen.getByLabelText('Share button');
    fireEvent.click(shareButton);

    expect(copiedText).to.include(encodedList);

    const downloadButton = screen.getByLabelText('Download button');
    fireEvent.click(downloadButton);
  });

  it('should render Rank component with query params', () => {
    render(
      <Router base="/listly">
        <Shell />
        <Link href={`/rank?rank=${encodedList}`}>Link to Rank</Link>
      </Router>
    );

    const linkToRank = screen.getByText('Link to Rank');
    fireEvent.click(linkToRank);

    expect(
      screen.getAllByText(l(en['page.rank.title']))[0]
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Rank table')).toBeInTheDocument();
  });
});
