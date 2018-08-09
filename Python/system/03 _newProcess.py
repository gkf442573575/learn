# -*- coding:utf-8 -*-

from multiprocessing import Process

import os

class newProcess(Process):

    # 重写Process的run方法
    def run(self):
        print("子进程(%s) 开始执行，父进程为（%s）" % (os.getpid(), os.getppid()))

if __name__ == '__main__':
    p = newProcess()
    p.start()
    p.join()
    print('子进程结束')