# -*- coding:utf-8 -*-


import os

renameFileName = input('请输入需要改名的文件名:')

renameFile = open(renameFileName, 'a')

if renameFile:
    # 提取文件后缀
    fileFlagNum = renameFileName.rfind('.')
    if fileFlagNum > 0:
        fileFlag = renameFileName[fileFlagNum:]
    reName = input('输入修改名称：')
    endFileName = reName + fileFlag
    hasEndFile = os.path.exists(endFileName)
    if hasEndFile:
        os.remove(endFileName)
    renameFile.close()
    os.rename(renameFileName, endFileName)
