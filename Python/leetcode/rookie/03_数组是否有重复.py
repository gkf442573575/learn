

def containsDuplicate(nums=[]):
    a = set()
    for i in nums:
        if i in a:
            return True
        else:
            a.add(i)
    return False

b = containsDuplicate([1,2,1])
print(b)