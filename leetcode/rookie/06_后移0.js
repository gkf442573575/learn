const moveZero = function (nums = []) {
  if (nums.length <= 1) {
    return nums;
  }
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== 0) {
      let a = nums[j];
      nums[j] = nums[i];
      nums[i] = a;
      i++;
    }
  }
  return nums;
};

console.log(moveZero([0, 1, 0, 2, 3]));
