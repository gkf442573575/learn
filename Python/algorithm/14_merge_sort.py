# -*- coding:utf-8 -*-

def merge_sort(alist):
    '''
    归并排序 稳定
    :param alist:
    :return:
    '''
    if len(alist) <= 1:
        return alist
    num = len(alist) // 2
    left = merge_sort(alist[:num])
    right = merge_sort(alist[num:])
    # 合并
    return merge(left, right)


def merge(left, right):
    '''
    合并操作，将两个有序数组left[]和right[]合并成一个大的有序数组
    :param left:
    :param right:
    :return:
    '''
    l, r = 0, 0
    result = []
    while l < len(left) and r < len(right):
        if left[l] < right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    result += left[l:]
    result += right[r:]
    return result


if __name__ == '__main__':
    alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
    sorted_alist = merge_sort(alist)
    print(sorted_alist)