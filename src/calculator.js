#!/usr/bin/env node
/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   add (+)       - Addition
 *   subtract (-)  - Subtraction
 *   multiply (*)  - Multiplication
 *   divide (/)    - Division (division by zero returns an error)
 *
 * Usage: node src/calculator.js <operation> <a> <b>
 * Example: node src/calculator.js add 2 3
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

const operations = {
  add, '+': add,
  subtract, '-': subtract,
  multiply, '*': multiply,
  divide, '/': divide,
};

function main(argv) {
  const [op, rawA, rawB] = argv;
  const fn = operations[op];
  if (!fn || rawA === undefined || rawB === undefined) {
    console.error('Usage: node src/calculator.js <add|subtract|multiply|divide> <a> <b>');
    return 1;
  }
  const a = Number(rawA);
  const b = Number(rawB);
  if (Number.isNaN(a) || Number.isNaN(b)) {
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

module.exports = { add, subtract, multiply, divide };
