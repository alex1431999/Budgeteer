import { describe, test, expect } from 'bun:test';
import { addId } from '../../util/database';

describe('addId', () => {
  test('adds id', () => {
    expect(addId({ hello: 'there' }))
      .toEqual({ hello: 'there', _id: expect.anything() });
  });
});
