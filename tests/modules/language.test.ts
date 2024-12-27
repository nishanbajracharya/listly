import { describe, it, expect, beforeAll } from 'vitest';

import { l } from '../../src/modules/language';

import en from '../../src/constants/localization/en.json';

describe('Localization tests', () => {
  beforeAll(() => {

  });

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
});
