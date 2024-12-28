import { describe, it, expect, vi } from 'vitest';

import { l } from '../../src/modules/language';

import en from '../../src/constants/localization/en.json';

describe('Localization tests', () => {
  it('should translate key correctly', () => {
    const key = 'base.app.title';
    const expected = en[key];

    const actual = l(key);

    expect(actual).to.eq(expected);
  });

  it('should use fallback string if key is not found and fallback string is provided', () => {
    const key = 'random-key';
    const fallback = 'Fallback string';

    const actual = l(key, fallback);

    expect(actual).to.eq(fallback);
  });

  it('should return the same key if key is not found and fallback string is not provided', () => {
    const key = 'random-key';

    const actual = l(key);

    expect(actual).to.eq(key);
  });

  it('should fallback to en language', () => {
    localStorage.setItem('language', '');
    const spy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('es');
    const key = 'base.app.title';
    const expected = en[key];

    const actual = l(key);

    expect(actual).to.eq(expected);

    console.log(navigator.language);

    spy.mockRestore();

    localStorage.setItem('language', 'en');
  });
});
