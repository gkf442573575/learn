# -*- coding:utf-8 -*-

# 打开文件

f = open('test.txt', 'r')
str = f.read(3)
print('读取的数据=%s' % str)

# 查找当前位置
postion = f.tell()
print('当前文件位置%s' % postion)

str = f.read(3)
print('读取的数据=%s' % str)

postion = f.tell()
print('当前文件位置%s' % postion)

f.close()