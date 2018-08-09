# -*- coding:utf-8 -*-

# python跨平台多进程模块
from multiprocessing import Process

import os


# windows 不支持fork

def run_proc(name):
    print('子进程 %s (%s)...' % (name, os.getpid()))


if __name__ == '__main__':
    print('父进程 %s.' % os.getpid())
    rpid = Process(target=run_proc, args=('test',))
    rpid.start()
    rpid.join()
    print('子进程结束')

'''
if __name__ == '__main__':
    rpid = os.fork()
    if rpid < 0:
        print('fork 调用失败')
    elif rpid == 0:
        print('子进程（%s）,我的父进程（%s）' % (os.getpgid(), os.getppid()))
    else:
        print("我是父进程（%s），我的子进程是（%s）" % (os.getpid(), rpid))
    
    print("父子进程都可以执行这里的代码")
'''
