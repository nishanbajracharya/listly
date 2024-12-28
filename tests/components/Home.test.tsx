import React from 'react';
import { describe, it, expect } from 'vitest';

import { l } from '../../src/modules/language';
import Home from '../../src/components/pages/Home';
import en from '../../src/constants/localization/en.json';
import { render, screen, waitFor, fireEvent } from '../../test-utils';

describe('Home component', () => {
  const listInput = 'A,B,C,D';
  const listSaved = 'A\nB\nC\nD';

  it('should render Home component', async () => {
    render(<Home />);

    expect(screen.getByText(l(en['page.home.title']))).toBeInTheDocument();

    const textAreaBefore =
      screen.getByLabelText<HTMLInputElement>('List input field');

    fireEvent.change(textAreaBefore, { target: { value: listInput } });
    expect(textAreaBefore.value).toBe(listInput);

    const saveButton =
      screen.getByLabelText<HTMLButtonElement>('Save list button');
    fireEvent.click(saveButton);

    const textAreaAfter =
      screen.getByLabelText<HTMLInputElement>('List input field');
    expect(textAreaAfter.value).toBe(listSaved);

    const clearListButton = screen.getByLabelText('Clear list button');
    fireEvent.click(clearListButton);

    await waitFor(() => {
      const clearListModal = screen.getByLabelText('Clear list modal');
      expect(clearListModal).toBeInTheDocument();

      const closeModalButton = screen.getByLabelText('Close modal button');
      expect(closeModalButton).toBeInTheDocument();
      fireEvent.click(closeModalButton);

      fireEvent.click(clearListButton);
      expect(clearListModal).toBeInTheDocument();

      const clearListModalButton = screen.getByLabelText(
        'Clear list modal button'
      );
      expect(clearListModalButton).toBeInTheDocument();
      fireEvent.click(clearListModalButton);
    });

    const textAreaAfterClear =
      screen.getByLabelText<HTMLInputElement>('List input field');
    expect(textAreaAfterClear.value).toBe('');
  });
});
