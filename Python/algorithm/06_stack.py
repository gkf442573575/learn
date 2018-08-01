# -*- coding:utf-8 -*-

'''
栈
'''


class Stack(object):
    def __init__(self):
        self.items = []

    def is_empty(self):
        '''
        是否为空
        :return:
        '''
        return len(self.items) == 0

    def push(self, item):
        '''
        添加元素
        :param item:
        :return:
        '''
        self.items.append(item)

    def pop(self):
        '''
        弹出元素
        :return:
        '''
        return self.items.pop()

    def peek(self):
        '''
        返回栈顶元素
        :return:
        '''
        return self.items[len(self.items) - 1]

    def size(self):
        '''
        返回大小
        :return:
        '''
        return len(self.items)


if __name__ == '__main__':
    stack = Stack()
    print(stack.is_empty())
