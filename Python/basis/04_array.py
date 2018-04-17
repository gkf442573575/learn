# -*- coding:utf-8 -*-

namelist = ['小明','小李','小花']

print("-----添加之前，列表namelist的数据-----")


for name in namelist:
    print(name) 

temp = input('请输入要添加的学生姓名:')
namelist.append(temp) # 通过append可以向列表添加元素

print("-----添加之后，列表namelist的数据-----")

for name in namelist:
    print(name) 

