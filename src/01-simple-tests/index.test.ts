// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rez = simpleCalculator({ a: 5, b: 5, action: Action.Add });
    expect(rez).toBe(10);
  });

  test('should subtract two numbers', () => {
    const rez = simpleCalculator({ a: 5, b: 5, action: Action.Subtract });
    expect(rez).toBe(0);
  });

  test('should multiply two numbers', () => {
    const rez = simpleCalculator({ a: 5, b: 5, action: Action.Multiply });
    expect(rez).toBe(25);
  });

  test('should divide two numbers', () => {
    const rez = simpleCalculator({ a: 5, b: 5, action: Action.Divide });
    expect(rez).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const rez = simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate });
    expect(rez).toBe(4);
  });

  test('should return null for invalid action', () => {
    const rez = simpleCalculator({ a: 2, b: 2, action: null });
    expect(rez).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rez = simpleCalculator({
      a: null,
      b: null,
      action: Action.Exponentiate,
    });
    expect(rez).toBeNull();
  });
});
