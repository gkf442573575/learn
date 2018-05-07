# -*- coding:utf-8 -*-

class CarStore(object):
    def order(self,car_type):
        if car_type == 'bmw':
            return BMW()
        elif car_type == 'benzi':
            return Benzi()

class Car(object):
    def move(self):
        print('汽车移动')
    def stop(self):
        print('汽车停止')
# 类继承直接在函数中继承
class BMW(Car):
    pass

class Benzi(Car):
    pass

car_store = CarStore()
car = car_store.order('bmw')
car.move()
car.stop()