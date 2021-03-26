function getMaxToal(nums) {
  let total = 0;
  for (let index = 0; index < nums.length - 1; index++) {
    total = total + Math.max(nums[index + 1] - nums[index], 0);
  }
  return total;
}

getMaxToal([7, 1, 4, 5, 6, 3]);
