import { describe, it, expect, beforeAll } from 'vitest';

import { encode, decode } from '../../src/modules/encoding';

describe('Encoding tests', () => {
  const decodedText = 'Hello World';
  const encodedText = 'SGVsbG8lMjBXb3JsZA==';

  it('should encode', () => {
    const encoded = encode(decodedText);

    expect(encoded).to.eq(encodedText);
  });

  it('should decode', () => {
    const decoded = decode(encodedText);

    expect(decoded).to.eq(decodedText);
  });
});
