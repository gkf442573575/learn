 # -*- coding:utf-8 -*-


'''
冒泡排序
'''


def bubble_sort(alist):
    for j in range(len(alist) - 1, 0, -1):
        for i in range(j):
            if alist[i] > alist[i + 1]:
                alist[i], alist[i + 1] = alist[i + 1], alist[i]

if __name__ == '__main__':
    li = [54, 26, 93, 17, 77, 31, 44, 55, 20]
    bubble_sort(li)
    print(li)