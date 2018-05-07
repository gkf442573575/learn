# -*- coding:utf-8 -*-


# 自定义异常

class ShortInputException(Exception):
    def __init__(self,len,atleast):
        self.len = len
        self.atleast = atleast




def main():
    try:
        s = input('请输入》》》')
        if len(s) < 3:
            raise ShortInputException(len(s),3)
    except ShortInputException as result:
        print('ShortInputException: 输入的长度是%d，长度至少应该是%d'%(result.len,result.atleast))
    else:
        print('没有问题')


main()