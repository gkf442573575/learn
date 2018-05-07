# -*- coding:utf-8 -*-


# 建议 
'''

import sendmsg

sendmsg.test1()

'''


'''

from sendmsg import test1
test1()

'''


'''
from sendmsg import test1,test2
test1()
test2()

'''
# 少用 *  如果方法引入模块的方法相同，会被冲掉
'''

from sendmsg import *

test1()
test2()
'''

# as 起一个别名 
import sendmsg as msg 
msg.test1()


