# -*- coding:utf-8 -*-


a = [1,2]
b = [3,4]

a.append(b) #通过extend可以将另一个集合中的元素逐一添加到列表中
print(a)

a.append(b)
print(a)


c = [0,1,2] 
c.insert(1,3)#insert(index, object) 在指定位置index前插入元素object
print(c)

'''
in（存在）,如果存在那么结果为true，否则为false
not in（不存在），如果不存在那么结果为true，否则false
'''

#待查找的列表
nameList = ['小明','小李','小花']

#获取用户要查找的名字
findName = input('请输入要查找的姓名:')

#查找是否存在
if findName in nameList:
    print('在字典中找到了相同的名字')
else:
    print('没有找到')



