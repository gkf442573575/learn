# -*- coding:utf-8 -*-


try:
    print(num)
    print('----1----')
except (NameError,FileNotFoundError):  # 元组,匹配多个异常
    print('多处理')
except Exception as ret: # 可以捕获所有异常
    print(ret)   # 捕获异常的具体原因
    print('Exception 就是上述异常未捕获，这个一定会捕获')
else:
    print('无异常，执行')  
finally:
    print('无论是否异常，都执行')


'''
except NameError:
    print('此时异常的处理')
except FileNotFoundError:
    print('文件不存在')
'''