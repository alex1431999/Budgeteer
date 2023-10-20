import { describe, test, expect } from 'bun:test';
import { addId, addIdsToNestedObject } from '../../util/database';

describe('addId', () => {
  test('adds id', () => {
    expect(addId({ hello: 'there' }))
      .toEqual({ hello: 'there', _id: expect.anything() });
  });
});

describe('addIdsToNestedObject', () => {
  test('0 levels of nesting', () => {
    expect(addIdsToNestedObject({})).toEqual({ _id: expect.anything() });
  });

  test('1 level of nesting', () => {
    const obj = {
      hello: 'there',
      someArray: [{ hello: 'there' }],
    };
    const objWithNesting = {
      _id: expect.anything(),
      hello: 'there',
      someArray: [{ _id: expect.anything(), hello: 'there' }],
    };
    expect(addIdsToNestedObject(obj)).toEqual(objWithNesting);
  });

  test('with nested objects', () => {
    const obj = {
      hello: 'there',
      someObject: {
        hello: 'there',
      },
    };
    const objWithNesting = {
      _id: expect.anything(),
      hello: 'there',
      someObject: {
        _id: expect.anything(),
        hello: 'there',
      },
    };
    expect(addIdsToNestedObject(obj)).toEqual(objWithNesting);
  });
});
