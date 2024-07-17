import formatCurrency from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');


console.log('converts cents into dollars');

// test case 1 (basic test case)
if (formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

// test case 2 (edge case)
if (formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

// test case 3 (edge case)
if (formatCurrency(2000.5) === '20.01'){
  console.log('passed');
}else {
  console.log('failed');
}

console.log('rounds down to nearest cent');

// test case 4 (edge case)
if (formatCurrency(2000.4) === '20.00'){
  console.log('passed');
} else {
  console.log('failed');
}