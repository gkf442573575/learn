# -*- coding:utf-8 -*-

# Node

class Node(object):
    def __init__(self, item):
        self.item = item
        self.next = None


# 循环单链表

class SinCycLinkedlist(object):

    def __init__(self):
        self.__head = None

    def is_empty(self):
        '''
        是否为空
        :return: Boolean True/False
        '''
        return self.__head == None

    def length(self):
        '''
        单向循环链表的长度
        '''
        # 如果是空链表的話
        if self.is_empty():
            return 0
        count = 0
        cur = self.__head
        while cur.next != self.__head:
            count += 1
            cur = cur.next
        return count

    def travel(self):
        '''
        遍历
        :return:
        '''
        # 空链表 直接返回
        if self.is_empty():
            return
        cur = self.__head
        while cur.next != self.__head:
            cur = cur.next
            print(cur.item)

    def add(self, item):
        '''
        头部添加
        :param item:
        :return:
        '''
        node = Node(item)
        if self.is_empty():
            self.__head = node
            node.next = self.__head
        else:
            # 添加的节点指向_head
            node.next = self.__head
            # 移到链表尾部，将尾部节点的next指向node
            cur = self.__head
            while cur.next != self.__head:
                cur = cur.next
            # _head指向添加node的
            cur.next = node
            self.__head = node

    def append(self, item):
        '''
        尾部添加
        :param item: 添加的数据
        :return:
        '''
        node = Node(item)
        if self.is_empty():
            self.__head = node
            node.next = self.__head
        else:
            # 移到链表尾部
            cur = self.__head
            while cur.next != self.__head:
                cur = cur.next
            # 将尾节点指向node
            cur.next = node
            # 将node指向头节点_head
            node.next = self.__head

    def insert(self, pos, item):
        '''
        在pos位置添加节点
        :param pos: 位置
        :param item: 节点
        :return:
        '''
        if pos <= 0:
            self.add(item)
        elif pos > (self.length() - 1):
            self.append(item)
        else:
            node = Node(item)
            count = 0
            cur = self.__head
            # 移动到指定位置的前一个位置
            while count < (pos - 1):
                count += 1
                cur = cur.next
            node.next = cur.next
            cur.next = node

    def remove(self, item):
        '''
        移除某个节点
        :param item:
        :return:
        '''
        if self.is_empty():
            return
        cur = self.__head
        pre = None
        # 若头节点的元素就是要查找的元素item
        if cur.item == item:
            # 如果链表不止一个节点
            if cur.next != self.__head:
                # 先找到尾节点，将尾节点的next指向第二个节点
                while cur.next != self.__head:
                    cur = cur.next
                cur.next = self.__head.next
                self.__head = self.__head.next
            else:
                self.__head = None
        else:
            # 第一个节点不是要删除的
            pre = self.__head
            while cur.next != self.__head:
                # 找到了要删除的元素
                if cur.item == item:
                    # 删除
                    pre.next = cur.next
                    return
                else:
                    pre = cur
                    cur = cur.next
            # 尾节点
            if cur.item == item:
                pre.next = cur.next

    def search(self, item):
        '''
        查找某节点
        :param item:
        :return: boolean
        '''
        if self.is_empty():
            return False
        cur = self.__head
        if cur.item == item:
            return True
        while cur.next != self.__head:
            cur = cur.next
            if cur.item == item:
                return True
        return False
