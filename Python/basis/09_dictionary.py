# -*- coding:utf-8 -*-

info = {'name': '班长', 'id': 100, 'sex': 'f', 'address': '地球亚洲中国北京'}
# 字典键值对个数
infoLen = len(info)
print('键值对个数%d' % infoLen)

infoKeyList = info.keys()  # 返回一个包含字典所有KEY的列表
print(infoKeyList)

infoValList = info.values()  # 返回一个包含字典所有value的列表
print(infoValList)

infoItems = info.items()  # 返回一个包含所有（键，值）元祖的列表
print(infoItems)

