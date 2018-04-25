# -*- coding:utf-8 -*-

oldFileName = input('请输入要复制的文件名字:')

oldFile = open(oldFileName, 'r')
# 如果打开文件
if oldFile:
    # 提取文件后缀
    fileFlagNum = oldFileName.rfind('.')
    if fileFlagNum > 0:
        fileFlag = oldFileName[fileFlagNum:]
    # 组成新的文件名
    newFileName = oldFileName[:fileFlagNum] + '.copy' + fileFlag

    newFile = open(newFileName, 'w')
    # readline()读取数据
    for lineContent in oldFile.readline():
        newFile.write(lineContent)

    # 关闭文件
    oldFile.close()
    newFile.close()
