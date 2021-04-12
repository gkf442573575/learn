# -*- coding:utf-8 -*-


namelist = ['小李', '小明', '小花']

for name in namelist:
    print(name)

arrlen = len(namelist)

i = 0

while i < arrlen:
    print('下标%d' % i + namelist[i])
    i += 1
