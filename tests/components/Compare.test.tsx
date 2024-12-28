import React from 'react';
import { Router } from 'wouter';
import { describe, it, expect } from 'vitest';

import { l } from '../../src/modules/language';
import { render, screen, fireEvent } from '../__utils';
import Compare from '../../src/components/pages/Compare';
import en from '../../src/constants/localization/en.json';

describe('Compare component', () => {
  const list = ['A', 'B', 'C'];
  const matchCount = (list.length * (list.length - 1)) / 2;

  it('should render empty Compare component', () => {
    render(
      <Router base="/listly">
        <Compare />
      </Router>
    );

    expect(screen.getByText(l(en['page.compare.title']))).toBeInTheDocument();
    expect(screen.getByText(l(en['page.compare.empty']))).toBeInTheDocument();

    const goToHomeButton = screen.getByLabelText('Go to home button');
    fireEvent.click(goToHomeButton);

    expect(location.pathname).to.eq('/listly/');
  });

  it('should render filled Compare component', () => {
    localStorage.setItem('list', JSON.stringify(list));

    render(
      <Router base="/listly">
        <Compare />
      </Router>
    );

    expect(
      screen.getByText(l(en['page.compare.description']))
    ).toBeInTheDocument();

    const startComparisonButton = screen.getByLabelText(
      'Start comparison button'
    );
    fireEvent.click(startComparisonButton);

    const switchToQuickCompare = screen.getByLabelText(
      'Switch to quick compare'
    );
    fireEvent.click(switchToQuickCompare);

    const switchToQuickCompareAfter = screen.getByLabelText<HTMLInputElement>(
      'Switch to quick compare'
    );
    expect(switchToQuickCompareAfter.checked).to.be.eq(true);

    fireEvent.click(switchToQuickCompare);

    for (let i = 0; i < matchCount; i++) {
      const index = i % 2 === 0 ? 1 : 2;
      const card = screen.getByLabelText<HTMLButtonElement>(`Card ${index}`);
      expect(card).toBeInTheDocument();

      fireEvent.click(card);
    }

    expect(
      screen.getByText(l(en['page.compare.done.title']))
    ).toBeInTheDocument();

    const goToRankingButton = screen.getByLabelText('Go to ranking button');
    expect(goToRankingButton).toBeInTheDocument();

    fireEvent.click(goToRankingButton);

    expect(location.pathname).to.eq('/listly/rank');
  });
});
