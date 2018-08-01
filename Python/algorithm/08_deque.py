# -*- coding:utf-8 -*-


'''
双端队列（deque，全名double-ended queue），是一种具有队列和栈的性质的数据结构。

双端队列中的元素可以从两端弹出，其限定插入和删除操作在表的两端进行。双端队列可以在队列任意一端入队和出队

'''

class Deque(object):
    def __init__(self):
        self.items = []

    def is_empty(self):
        return  len(self.items) == 0

    def add_front(self,item):
        '''
        对队首添加元素
        :param item:
        :return:
        '''
        self.items.insert(0,item)
    def add_rear(self,item):
        '''
        队未添加元素
        :param item:
        :return:
        '''
        self.items.append(item)
    def remove_front(self):
        '''
        队首移除元素
        :return:
        '''
        return  self.items.pop(0)
    def remove_rear(self):
        '''
        队未移除元素
        :return:
        '''
        return  self.items.pop()
    def size(self):
        return len(self.items)