
def plusOne(digits=[]):
    for i in range(len(digits) - 1, 0, -1):
        if digits[i] != 9:
            digits[i] = digits[i] + 1
            return digits
        else:
            digits[i] = 0
            
    digits.insert(0, 1)
    return digits


num = plusOne([1, 3, 9, 9])
print(num)
