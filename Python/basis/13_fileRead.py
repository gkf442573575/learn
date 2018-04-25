# -*- coding:utf-8 -*-

# 只读方式打开文件
f = open('test.txt', 'r')
# read(num) num为字节数 不填写就是整个数据
content = f.read(5)
print(content)
