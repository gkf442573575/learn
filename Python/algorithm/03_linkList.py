# -*- coding:utf-8 -*-


class Node(object):
    '''
        单链表的节点
    '''

    def __init__(self, item):
        # item 是存储的数据
        self.item = item
        # next 是下一个节点的标示
        self.next = None


# 单向链表
class SingleLinkList(object):
    def __init__(self):
        self.__head = None

    def is_empty(self):
        # 判断链表是否为空
        return self.__head == None

    def length(self):
        # 返回链表长度
        cur = self.__head
        count = 0
        while cur != None:
            count += 1
            cur = cur.next
        return count

    def travel(self):
        # 遍历链表
        cur = self.__head
        while cur != None:
            print(cur)
            cur = cur.next
        print('遍历完成')

    def add(self, item):
        # 头部添加
        '''
            1.创建新的节点
            2.将新节点的链接域next指向头节点，即__head指向的位置
            3.将链表的头__head指向新节点
        '''
        node = Node(item)
        node.next = self.__head
        self.__head = node

    def append(self, item):
        '''
        尾部添加
        :param item:数据
        1.先判断链表是否为空，
        2.空的话，直接将node赋值给head
        3.不为空的话，遍历到最后一个元素 next==None
        4.将最后一个元素的next赋值为node
        '''
        node = Node(item)
        if self.is_empty():
            self.__head = node
        else:
            cur = self.__head
            while cur.next != None:
                cur = cur.next
            cur.next = node

    def insert(self, pos, item):
        # 在某个位置添加
        # 指定位置在第一个元素之前，执行头部插入
        if pos <= 0:
            self.add(item)
        # 如果 指定位置 超过链表的尾部，执行 尾部插入
        elif pos > (self.length() - 1):
            self.append(item)
        else:
            # pre用来指向指定位置pos的前一个位置pos-1，初始从头节点开始移动到指定位置
            node = Node(item)
            count = 0
            pre = self.__head
            while count < (pos - 1):
                count += 1
                pre = pre.next
            # 先将新节点node的next指向插入位置的节点
            node.next = pre.next
            # 将插入位置的前一个节点的next指向新节点
            pre.next = node

    def remove(self, item):
        # 删除某个元素
        cur = self.__head
        pre = None
        while cur != None:
            # 找到了指定元素
            if cur.item == item:
                # 如果第一个就是删除的节点
                if not pre:
                    # 将头指针指向头节点的后一个节点
                    self.__head = cur.next
                else:
                    # 将删除位置前一个节点的next指向删除位置的后一个节点
                    pre.next = cur.next
                break
            else:
                # 继续按链表后移节点
                pre = cur
                cur = cur.next

    def search(self, item):
        # 判断元素是否在链表中
        cur = self.__head
        while cur != None:
            if cur.item == item:
                return True
            cur = cur.next
        return False


if __name__ == '__main__':
    ll = SingleLinkList()
    ll.add(1)
    ll.add(2)
    ll.append(3)
    ll.insert(2, 4)
    print("length:", ll.length())
    ll.travel()
    print(ll.search(3))
    print(ll.search(5))
    ll.remove(1)
    print("length:", ll.length())
    ll.travel()
