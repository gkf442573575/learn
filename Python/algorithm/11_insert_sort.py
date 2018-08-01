# -*- coding:utf-8 -*-

'''
插入排序
'''

def insert_sort(alist):
    # 从第二个位置，即下标为1的元素开始向前插入
    for i in range(1, len(alist)):
        for j in range(i, 0, -1):
            # 从第i个元素开始向前比较，如果小于前一个元素，交换位置
            if alist[j] < alist[j - 1]:
                alist[j], alist[j - 1] = alist[j - 1], alist[j]


if __name__ == '__main__':
    alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
    insert_sort(alist)
    print(alist)
