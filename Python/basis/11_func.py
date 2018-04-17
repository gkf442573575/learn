# -*- coding:utf-8 -*-

# 函数 function

def printInfo():
    print('调用了方法')


printInfo()


def add(a, b):
    return a + b


c = add(1, 2)
print('c=%d' % c)


def dvid(a, b):
    shang = a // b
    yushu = a % b
    # 返回多个值  利用元组
    return shang, yushu


sh, yu = dvid(5, 2)
print('sh=%d' % sh)
print('yu=%d' % yu)
