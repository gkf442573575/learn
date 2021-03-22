

def removeDuplicates(nums):
    left = 0
    for right in range(1, len(nums)):
        if nums[left] != nums[right]:
            nums[left] = nums[right]
            left = left + 1
    return left + 1

a = removeDuplicates([1,1,2])
print(a)

if __name__ == 'main':
  print(removeDuplicates([1, 1, 2]))
