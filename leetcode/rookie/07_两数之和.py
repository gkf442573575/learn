def twoSum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        j = hashmap.get(target - num)
        if j is not None:
            return [j, i]
        hashmap[num] = i


a = twoSum([3, 2, 5], 8)

print(a)
