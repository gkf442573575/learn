# -*- coding:utf-8 -*-


'''
双向链表的节点
'''


class Node(object):
    def __init__(self, item):
        self.item = item
        # 上一个节点
        self.prev = None
        # 下一个节点
        self.next = None


'''
双向链表
'''


class DlinkList(object):
    def __init__(self):
        self.__head = None

    def is_empty(self):
        '''
        判断是否为空
        :return: Boolean
        '''
        return self.__head == None

    def length(self):
        '''
        返回双向链表的长度
        :return: number
        '''
        cur = self.__head
        count = 0
        while cur != None:
            count += 1
            cur = cur.next
        return count

    def travel(self):
        cur = self.__head
        while cur != None:
            cur = cur.next

    def add(self, item):
        '''
        头部插入元素
        :param item:
        :return:
        '''
        node = Node(item)
        if self.is_empty():
            self.__head = node
        else:
            # 将node的next指向head
            node.next = self.__head
            # 将head的prev指向node
            self.__head.prev = node
            # 将head 指向node
            self.__head = node

    def append(self, item):
        '''
        尾部插入元素
        :param item:
        :return:
        '''
        node = Node(item)
        if self.is_empty():
            self.__head = node
        else:
            cur = self.__head
            # 移动到链表尾部
            while cur.next != None:
                cur = cur.next
            # 将尾节点cur的next指向node
            cur.next = node
            # 将node的prev指向cur
            node.prev = cur

    def insert(self, pos, item):
        '''
        插入某个元素
        :param pos: 插入位置
        :param item:
        :return:
        '''
        if pos <= 0:
            self.add(item)
        elif pos >= self.length():
            self.append(item)
        else:
            node = Node(item)
            cur = self.__head
            count = 0
            # 移动到指定位置的前一个位置
            while count < (pos - 1):
                count += 1
                cur = cur.next
            # 将node的prev指向cur
            node.prev = cur
            # 将node的next指向cur的下一个节点
            node.next = cur.next
            # 将cur的下一个节点的prev指向node
            cur.next.prev = node
            # 将cur的next指向node
            cur.next = node

    def remove(self, item):
        '''
        移除某个元素
        :param item:
        :return:
        '''
        if self.is_empty():
            return
        else:
            cur = self.__head
            # 如果首节点的元素即是要删除的元素
            if cur.item == item:
                if cur.next == None:
                    # 如果链表只有这一个节点
                    self.__head = None
                else:
                    # 将第二个节点的prev设置为None
                    cur.next.prev = None
                    # 将_head指向第二个节点
                    self.__head = cur.next
                return
            while cur != None:
                if cur.item == item:
                    # 将cur的前一个节点的next指向cur的后一个节点
                    cur.prev.next = cur.next
                    # 将cur的后一个节点的prev指向cur的前一个节点
                    cur.next.prev = cur.prev
                    break
                cur = cur.next

    def search(self, item):
        '''
        查找元素
        :param item:
        :return:
        '''
        cur = self.__head
        while cur != None:
            if cur.item == item:
                return True
            cur = cur.next
        return False


if __name__ == "__main__":
    ll = DlinkList()
    ll.add(1)
    ll.add(2)
    ll.append(3)
    ll.insert(2, 4)
    ll.insert(4, 5)
    ll.insert(0, 6)
    print("length:", ll.length())
    ll.travel()
    print(ll.search(3))
    print(ll.search(4))
    ll.remove(1)
    print("length:", ll.length())
    ll.travel()
