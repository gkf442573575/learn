# -*- coding:utf-8 -*-
# 字典

info = {'name': '班长', 'id': 100, 'sex': 'f', 'address': '地球亚洲中国北京'}

print(info['name'])
print(info['address'])
# 在我们不确定字典中是否存在某个键而又想获取其值时，可以使用get方法，还可以设置默认值
age = info.get('age', 18)
print(age)
# 修改
'''
newId = input('请输入新的学号')
info['id'] = int(newId)
print('修改之后的id为%d' % info['id'])
'''
# 添加
'''
info = {'name': '班长', 'sex': 'f', 'address': '地球亚洲中国北京'}
newId = input('请输入新的学号')
info['id'] = int(newId)
print('添加之后的id为%d' % info['id'])
'''

# 删除

del info['name']
print(info)
# 清空
info.clear()
print('clear后', info)

del info
print('删除字典', info)
