# -*- coding:utf-8 -*-

# 程序传递参数

import sys

print(sys.argv)

argv = sys.argv

name = argv[1]

print('欢迎使用%s'%name)