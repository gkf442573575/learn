# -*- coding:utf-8 -*-

# 单例模式

class Dog(object):
    __instance = None
    def __new__(cls):
        if cls.__instance == None:  
            cls.__instance = object.__new__(cls)
            return cls.__instance
        else:
            # 返回上一次创建的对象的引用
            return cls.__instance



a = Dog()
print(id(a))
b = Dog()
print(id(b))