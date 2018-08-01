# -*- coding:utf-8 -*-

'''
队列
'''

class Queue(object):
    def __init__(self):
        self.items = []
    def is_empty(self):
        '''
        是否为空
        :return:
        '''
        return len(self.items) == 0

    def enqueue(self, item):
        '''
        入队
        :param item:
        :return:
        '''
        self.items.insert(0, item)

    def dequeue(self):
        '''
        出队
        :return:
        '''
        return  self.items.pop()
    def size(self):
        return len(self.items)
