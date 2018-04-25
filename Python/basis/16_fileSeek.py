# -*- coding:utf-8 -*-


'''
    seek(offset, from)有2个参数

    offset:偏移量
    from:方向
    0:表示文件开头
    1:表示当前位置
    2:表示文件末尾

'''

f = open('test.txt','r')
str = f.read(10)
print('读取的数据=%s' % str)

# 找当前位置
position = f.tell()
print('当前文件位置%s' % position)

# 重新设置
f.seek(5,0)

# 查找当前位置
position = f.tell()
print('当前文件位置%s' % position)
f.close()


