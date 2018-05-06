# -*- coding:utf-8 -*-


# 异常处理抛出异常


class Test(object):
    def __init__(self,switch):
        self.switch = switch
    
    def calc(self,a,b):
        try:
            return a/b
        except Exception as result:
            if self.switch:
                print('捕获开启，已经捕获到异常,信息如下：')
                print(result)
            else:
                # 重新抛出这个异常，此时就不会被这个异常处理给捕获到，从而触发默认的异常处理
                # 可以在这个做操作
                raise

a = Test(True)
a.calc(11,0)

print('------------------分割线---------------')

a.switch = False
a.calc(11,0)