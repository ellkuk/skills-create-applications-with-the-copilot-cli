const { spawnSync } = require('child_process');
const path = require('path');
const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

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

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('10 % 3 = 1', () => expect(modulo(10, 3)).toBe(1));
  test('negative divisor keeps dividend sign', () => expect(modulo(10, -3)).toBe(1));
  test('0 % 5 = 0', () => expect(modulo(0, 5)).toBe(0));
  test('0 % 0 throws', () => {
    expect(() => modulo(0, 0)).toThrow('Modulo by zero');
  });
  test('evenly divisible gives 0', () => expect(modulo(10, 5)).toBe(0));
  test('smaller dividend returns itself', () => expect(modulo(2, 5)).toBe(2));
  test('negative dividend keeps sign', () => expect(modulo(-10, 3)).toBe(-1));
  test('handles decimals', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('throws on modulo by zero', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('2 ** 8 = 256', () => expect(power(2, 8)).toBe(256));
  test('power of 1 returns the base', () => expect(power(7, 1)).toBe(7));
  test('0 to a positive power is 0', () => expect(power(0, 5)).toBe(0));
  test('0 ** 0 = 1', () => expect(power(0, 0)).toBe(1));
  test('large exponent', () => expect(power(2, 30)).toBe(1073741824));
  test('anything to the power 0 is 1', () => expect(power(5, 0)).toBe(1));
  test('negative exponent', () => expect(power(2, -2)).toBe(0.25));
  test('negative base', () => expect(power(-2, 3)).toBe(-8));
  test('fractional exponent', () => expect(power(9, 0.5)).toBe(3));
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√1 = 1', () => expect(squareRoot(1)).toBe(1));
  test('large perfect square', () => expect(squareRoot(1e10)).toBe(1e5));
  test('throws for large negative numbers', () => {
    expect(() => squareRoot(-1e6)).toThrow('negative number');
  });
  test('throws for small negative decimals', () => {
    expect(() => squareRoot(-0.0001)).toThrow('negative number');
  });
  test('sqrt(0) = 0', () => expect(squareRoot(0)).toBe(0));
  test('non-perfect squares', () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test('handles decimals', () => expect(squareRoot(0.25)).toBe(0.5));
  test('throws for negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow('negative number');
  });
});

describe('package entry point', () => {
  test("require('.') resolves to the calculator", () => {
    const pkg = require('../../package.json');
    expect(require(path.resolve(__dirname, '../..', pkg.main))).toHaveProperty('add');
    expect(require.resolve('../..')).toBe(path.resolve(__dirname, '..', 'calculator.js'));
  });
});

describe('CLI', () => {
  const run = (...args) =>
    spawnSync('node', [path.join(__dirname, '..', 'calculator.js'), ...args], { encoding: 'utf8' });

  test('runs a supported operation', () => {
    const r = run('add', '2', '3');
    expect(r.stdout.trim()).toBe('5');
    expect(r.status).toBe(0);
  });

  test.each(['toString', 'constructor', 'hasOwnProperty', '__proto__', 'valueOf'])(
    'rejects inherited property name "%s"',
    (name) => {
      const r = run(name, '1', '2');
      expect(r.status).toBe(1);
      expect(r.stdout).toBe('');
      expect(r.stderr).toContain('Usage');
    }
  );
});
