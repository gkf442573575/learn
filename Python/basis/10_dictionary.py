# -*- coding:utf-8 -*-

# 字典遍历
info = {'name': '班长', 'id': 100, 'sex': 'f', 'address': '地球亚洲中国北京'}
# 遍历key
for key in info.keys():
    print(key)
# 遍历value
for val in info.values():
    print(val)
# 遍历字典项
for item in info.items():
    print(item)
# 遍历键值对
for key, val in info.items():
    print('key=%s,value=%s' % (key, val))
