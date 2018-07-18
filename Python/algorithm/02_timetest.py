# -*- coding:utf-8 -*-


from timeit import Timer


def test1():
    l = []
    for i in range(1000):
        l += [i]


def test2():
    l = []
    for i in range(1000):
        l.append(i)


t1 = Timer('test1()', 'from __main__ import test1')
print('concat', t1.timeit(number=1000), 'seconds')

t2 = Timer('test2()', 'from __main__ import test2')
print('concat', t2.timeit(number=1000), 'seconds')
