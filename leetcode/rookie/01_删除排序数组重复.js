
var removeDuplicates = function(nums){
  // if(!nums.length){
  //   return 0
  // }
  // let left = 0
  // for (let right = 1; right < nums.length; right++) {
  //   if(nums[left] !== nums[right]){
  //     nums[++left] = nums[right]
  //   }
  //   console.log('left', left)
  // }
  nums = [...new Set(nums)]
  console.log(nums)
  return nums.length
}

console.log(removeDuplicates([1,1,2]))