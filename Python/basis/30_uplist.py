# -*- coding:utf-8 -*-


# 生成列表

'''
python2中
range(10) [0,...,9]
range(10,18) [10,....,17]
range(10,18,2) [10,12,14,16] 2是步长
range 取 [10-78）的正数
range 在python2 中值特别大的情况，内存不会请求出来
python3 是生成的再从内存中请求
'''
a = [i for i in range(10)]
# [0,....,9]
print(a)

b = [11 for i in range(10)]
# [11,11,11,....,11]
print(b)

c = [i for i in range(10) if i%2==0]
# [0,2,4,6,8]
print(c)

d = [(i,j) for i in range(3) for j in range(2)]
# [(0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1)]
print(d)

e = [[i,j] for i in range(3) for j in range(2)]
# [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]]
print(e)