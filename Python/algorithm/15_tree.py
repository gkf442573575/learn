# -*- coding:utf-8 -*-

'''
二叉树
'''


class Node(object):
    '''
    节点
    '''

    def __init__(self, elem):
        '''
        节点
        :param elem: 根
        :param lchild: 左节点
        :param rchild: 右节点
        '''
        self.elem = elem
        self.lchild = None
        self.rchild = None


class Tree(object):
    '''
    二叉数
    '''

    def __init__(self):
        self.root = None

    def add(self, elem):
        '''
        添加节点
        :param elem:
        :return:
        '''
        node = Node(elem)
        # 如果根节点为空
        if self.root == None:
            self.root = node
        else:
            # 队列
            queue = []
            # 对已有的节点进行层次遍历
            queue.append(self.root)
            while queue:
                # 弹出队列的第一个元素
                cur = queue.pop(0)
                if cur.lchild == None:
                    cur.lchild = node
                    return
                elif cur.rchild == None:
                    cur.rchild = node
                    return
                else:
                    # 如果左右子树都不为空，加入队列继续判断
                    queue.append(cur.lchild)
                    queue.append(cur.rchild)

    def breadth_travel(self):
        '''
        利用队列实现树的层次遍历
        :return:
        '''
        if self.root == None:
            return
        queue = [self.root]
        while queue:
            node = queue.pop(0)
            print(node.elem, end=' ')
            if node.lchild != None:
                queue.append(node.lchild)
            if node.rchild != None:
                queue.append(node.rchild)

    def preorder(self, node):
        '''
        先序遍历
        根节点->左子树->右子树
        :param root:
        :return:
        '''
        if node == None:
            return
        print(node.elem, end=' ')
        self.preorder(node.lchild)
        self.preorder(node.rchild)

    def inorder(self, node):
        '''
        中序遍历
        左子树->根节点->右子树
        :param node:
        :return:
        '''
        if node == None:
            return

        self.inorder(node.lchild)
        print(node.elem, end=' ')
        self.inorder(node.rchild)

    def postorder(self, node):
        '''
        后序遍历
        左子树->右子树->根节点
        :param node:
        :return:
        '''
        if node == None:
            return
        self.postorder(node.lchild)
        self.postorder(node.rchild)
        print(node.elem, end=' ')


if __name__ == '__main__':
    tree = Tree()
    tree.add(1)
    tree.add(2)
    tree.add(3)
    tree.add(4)
    tree.add(5)
    tree.breadth_travel()
    print('\n')
    tree.preorder(tree.root)
    print('\n')
    tree.inorder(tree.root)
    print('\n')
    tree.postorder(tree.root)
