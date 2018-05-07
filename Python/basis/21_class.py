# -*- coding:utf-8 -*-


class Dog(object):
    def __init__(self): # 初始化
        print('__init 方法')
    def __del__(self): # 移除
        print('_del 方法')
    def __str__(self):
        print('_str 方法')
        return '对象的描述信息'
    def __new__(cls):  # cls 指向Dog的类对象
        print('_new 方法')
        return object.__new__(cls)

xtq = Dog()