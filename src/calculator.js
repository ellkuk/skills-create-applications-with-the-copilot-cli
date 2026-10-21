#!/usr/bin/env node
/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   add (+)       - Addition
 *   subtract (-)  - Subtraction
 *   multiply (*)  - Multiplication
 *   divide (/)    - Division (division by zero returns an error)
 *   modulo (%)    - Remainder of division (modulo by zero returns an error)
 *   power (**)    - Exponentiation: base raised to the exponent
 *   sqrt          - Square root, function squareRoot (negative input returns an error)
 *
 * Usage: node src/calculator.js <operation> <a> [b]
 * Example: node src/calculator.js add 2 3
 *          node src/calculator.js sqrt 16
 */

// Addition: a + b
function add(a, b) {
  return a + b;
}

// Subtraction: a - b
function subtract(a, b) {
  return a - b;
}

// Multiplication: a * b
function multiply(a, b) {
  return a * b;
}

// Division: a / b (throws on division by zero)
function divide(a, b) {
  if (b === 0) {
    throw new Error('Error: Division by zero is not allowed.');
  }
  return a / b;
}

// Modulo: a % b (throws on modulo by zero)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Error: Modulo by zero is not allowed.');
  }
  return a % b;
}

// Exponentiation: base raised to the exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square root: square root of n (throws for negative numbers)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Error: Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

const operations = {
  add, '+': add,
  subtract, '-': subtract,
  multiply, '*': multiply,
  divide, '/': divide,
  modulo, '%': modulo,
  power, '**': power,
  sqrt: squareRoot,
  squareRoot,
};

// Operations that take a single operand
const unary = new Set([squareRoot]);

function main(argv) {
  const [op, rawA, rawB] = argv;
  const fn = operations[op];
  const needsB = fn && !unary.has(fn);
  if (!fn || rawA === undefined || (needsB && rawB === undefined)) {
    console.error('Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power> <a> <b>\n       node src/calculator.js sqrt <a>');
    return 1;
  }
  const a = Number(rawA);
  const b = needsB ? Number(rawB) : undefined;
  if (Number.isNaN(a) || (needsB && Number.isNaN(b))) {
    console.error('Error: operands must be numbers.');
    return 1;
  }
  try {
    console.log(fn(a, b));
    return 0;
  } catch (err) {
    console.error(err.message);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
