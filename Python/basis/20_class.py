# -*- coding:utf-8 -*-


# 优化4s店类  工厂方法模式

class Store(object):

    def select_car(self):
        pass

    def order(self,car_type):
        return self.select_car()


class BWMCarStore(Store):
    def select_car(self,car_type):
        return BMWFactory().select_car_by_type(car_type)

class CarStore(Store):
    def select_car(self,car_type):
        return Factory().select_car_by_type(car_type)


class BMWFactory(object):
    def select_car_by_type(self,car_type):
        if car_type == 'bmw':
            return BMW()
        elif car_type == 'benzi':
            return Benzi()

class Factory(object):
    def select_car_by_type(self,car_type):
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