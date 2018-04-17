# -*- coding:utf-8 -*-

# 元组
# python中不允许修改元组的数据，包括不能删除其中的元素。

aTuple = ('et', 77, 99.9)

print('aTuple的小标0值' + aTuple[0])

a = aTuple.index(77, 1, 3)  # 注意是左闭右开区间 [1,3)
print(a)

b = aTuple.count(77)
print(b)
