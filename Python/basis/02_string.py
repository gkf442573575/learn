# -*- coding:utf-8 -*-

str = 'hello world'


'''
String[起始:结束:步长]

'''

print(str[0:3]) # 截取下标 0-2；

print(str[2:])  # 从下标为2的截取到结束
 
print(str[0::2]) # 从0 开始以2个为步长截取到最后

print(str[1:-1]) # 取 下标为1开始 到 最后第2个之间的字符

strlen = len(str)

a = str.find('llod',0,strlen)   # 查找字符串 -1为未找到
print(a)

b = str.index('llo',0,strlen) # 查找字符串， 未找到报错
print(b)

c = str.count('l',0,strlen)  # 'l' 在字符串中出现的次数
print(c)

d = str.replace('l','j',c-1)  #把 str 中的 l 替换成 j,如果 count 指定，则替换不超过 count 次.
print('l替换成j的%s'%d)

maxsplit = 2
e = str.split('l',maxsplit)   #  字符串分割成数组  如果 maxsplit有指定值，则仅分隔 maxsplit 个子字符串
print(e)

f = str.capitalize() #字符串首字母大写
print(f) 

g = str.title() # 每个字母都大写
print(g)

h = str.startswith('he') #检查字符串是否是以 obj 开头, 是则返回 True，否则返回 False
print(h)

i = str.endswith('d') #检查字符串是否是以 obj 结尾, 是则返回 True，否则返回 False
print(i)

j = str.lower() # 所有大写字符为小写
print(j)

k = str.upper() # 小写字母为大写
print(k)

l = str.ljust(20) #返回一个原字符串左对齐,并使用空格填充至长度 width 的新字符串
print(l)

m = str.rjust(20) #返回一个原字符串右对齐,并使用空格填充至长度 width 的新字符串
print(m)
print('字符串长度%d'%len(m))

n = str.center(20) #返回一个原字符串居中,并使用空格填充至长度 width 的新字符串
print(n)
print('字符串长度%d'%len(n))

o = n.lstrip() #删除 mystr 左边的空白字符
print(o)
print('字符串长度%d'%len(o))

p = n.rstrip() #删除 mystr 字符串末尾的空白字符
print(p)
print('字符串长度%d'%len(p))

q = n.strip() #删除mystr字符串两端的空白字符
print(q)

r = n.rfind('llo',0,strlen) # 从右查找
print(r)

s = n.rindex('llo',0,strlen) #从右开始
print(s)

t = str.partition('llo') #把str以llo分割成三部分,llo前，llo和llo后
print(t)

u = str.rpartition('llo') #从右开始 把str以llo分割成三部分,llo前，llo和llo后
print(u)