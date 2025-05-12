// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const inp = [1];
    const exp = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };
    expect(generateLinkedList(inp)).toEqual(exp);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const inp = [1, 2];
    const rez = generateLinkedList(inp);
    expect(rez).toMatchSnapshot();
  });
});
