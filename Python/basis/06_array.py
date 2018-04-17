# -*- coding:utf-8 -*-

movieName = ['加勒比海盗', '骇客帝国', '第一滴血', '指环王', '霍比特人', '速度与激情']

print('------删除之前------')
for tempName in movieName:
    print(tempName)
'''
del movieName[2] # del 根据小标删除
movieName.pop() # pop 删除最后一个
'''
movieName.remove('指环王')  # remove 根据元素的值进行删除

print('------删除之后------')
for tempName in movieName:
    print(tempName)
