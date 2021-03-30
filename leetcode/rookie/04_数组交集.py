
def intersect(nums1=[], nums2=[]):
    keymap = {}
    ans = []
    for i in nums1:
        if keymap.get(i):
            keymap[i] = keymap[i] + 1
        else:
            keymap[i] = 1
    for i in nums2:
        if keymap.get(i):
            ans.append(i)
            keymap[i] = keymap[i] - 1
    return ans


intersect([8, 1, 2, 7], [4, 2, 3, 1, 6, 7])
