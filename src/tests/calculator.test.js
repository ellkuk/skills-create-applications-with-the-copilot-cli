const { add, subtract, multiply, divide } = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('handles negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
    expect(add(-2, 5)).toBe(3);
  });
  test('handles zero', () => expect(add(0, 7)).toBe(7));
  test('handles decimals', () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
  test('handles large numbers', () => expect(add(1e15, 1e15)).toBe(2e15));
});

describe('subtract', () => {
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('result can be negative', () => expect(subtract(4, 10)).toBe(-6));
  test('handles negative operands', () => expect(subtract(-5, -3)).toBe(-2));
  test('handles zero', () => expect(subtract(5, 0)).toBe(5));
  test('handles decimals', () => expect(subtract(0.3, 0.1)).toBeCloseTo(0.2));
});

describe('multiply', () => {
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('multiplying by zero gives zero', () => expect(multiply(5, 0)).toBe(0));
  test('negative times negative is positive', () => expect(multiply(-3, -4)).toBe(12));
  test('negative times positive is negative', () => expect(multiply(-3, 4)).toBe(-12));
  test('handles decimals', () => expect(multiply(0.5, 4)).toBe(2));
});

describe('divide', () => {
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('returns decimal results', () => expect(divide(1, 4)).toBe(0.25));
  test('handles negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });
  test('zero divided by a number is zero', () => expect(divide(0, 5)).toBe(0));
  test('throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });
  test('throws on zero divided by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero');
  });
});
