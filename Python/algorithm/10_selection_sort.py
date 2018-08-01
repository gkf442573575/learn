# -*- coding:utf-8 -*-

'''
选择排序
'''


def selection_sort(alist):
    n = len(alist)
    # 需要进行n-1次选择操作
    for i in range(n - 1):
        # 记录最小位置
        minIndex = i
        # 从i+1位置到末尾选择出最小数据
        for j in range(i + 1, n):
            if alist[j] < alist[minIndex]:
                minIndex = j
        # 如果选择出的数据不在正确位置，进行交换
        if minIndex != i:
            alist[i], alist[minIndex] = alist[minIndex], alist[i]


if __name__ == '__main__':
    alist = [54, 226, 93, 17, 77, 31, 44, 55, 20]
    selection_sort(alist)
    print(alist)
