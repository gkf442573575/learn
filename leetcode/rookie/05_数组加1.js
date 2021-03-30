var plusOne = function (digits = []) {
  const len = digits.length;
  for (let i = len - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i] += 1;
      return digits;
    } else {  
      digits[i] = 0;
    }
  }
  digits.unshift(1);
  return digits;
};

const num = plusOne([9, 9, 9, 9]);
console.log('num', num)
