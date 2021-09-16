const twoSum = function (nums = [], target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const otherIndex = map.get(target - nums[i]);
    if (otherIndex !== undefined) {
      return [otherIndex, i];
    }
    map.set(nums[i], i);
  }
};

console.log(twoSum([3,2,5], 8))