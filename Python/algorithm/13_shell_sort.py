# -*- coding:utf-8 -*-


def shell_sort(alist):
    '''
    希尔排序
    :param alist: 排序的列表
    :return:
    '''
    n = len(alist)
    gap = n // 2
    while gap > 0:
        # 按步长进行插入排序
        for i in range(gap, n):
            j = i
            # 插入排序
            while j >= gap and alist[j - gap] > alist[j]:
                alist[j - gap], alist[j] = alist[j], alist[j - gap]
                j -= gap
        gap = gap // 2


if __name__ == '__main__':
    alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
    shell_sort(alist)
    print(alist)
