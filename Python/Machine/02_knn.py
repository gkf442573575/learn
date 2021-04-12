from sklearn.neighbors import KNeighborsClassifier

import sklearn.datasets as datasets

from sklearn.model_selection import train_test_split

# 获取数据
iris = datasets.load_iris()

# 提取样本数据
feature = iris['data']
target = iris['target']

# 对数据集进行拆分
x_train, x_test, y_train, y_test = train_test_split(feature, target, test_size=0.2, random_state=2020)

#  print(x_train.shape)
#  n_neighbors 就是k值 模型的超参数
# 实例化模型
knn = KNeighborsClassifier(n_neighbors=8)

# 训练模型
# X 训练集特征数据 特征数据的维度必须是二维F
# y 训练集的标签数据
knn = knn.fit(x_train, y_train)

# 测试模型
y_pred = knn.predict(x_test)
y_true = y_test

score = knn.score(x_test, y_test)
print('模型分类结果：', y_pred)
print('真实分类结果：', y_true)
print('得分', score)
