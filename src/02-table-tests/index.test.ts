// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 5, action: Action.Add, expected: 10 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 2, action: null, expected: null },
  { a: null, b: null, action: Action.Exponentiate, expected: null },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)('test', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
