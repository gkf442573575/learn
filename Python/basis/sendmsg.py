# -*- coding:utf-8 -*-


# 定义模块
'''
# import * 暴露的全局变量
__all__= ['test1']
'''

def test1():
    print('test1')

    
def test2():
    print('test2')



# 模块自执行测试
if __name__ == '__main__':
    test1()
    test2()


def main():
    pass

if __name__ == '__main__':
    main()