let a: number = 1;
console.log(a);
let b: [string, number];
b = ['hello', 1];
//b = [1,'hello']; //Error 定义的数组类型必须11对应

enum Color { // ts的枚举
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}
let c: Color = Color.Red;
console.log('c', c);

class Animal {
  static lag: number = 4;
  public name: string; // readonly啥的还有
  constructor(theName: string) {
    this.name = theName;
  }
  static getLag() {
    console.log(this.lag); // 静态方法可以调用静态属性
    // console.log(this.name);  //ERROR 静态方法 没法直接调用类里面的属性
  }
  eat() {
    console.log('吃的方式');
  }
}

/**
 * 多态：属于继承，父类定义一个方法，不去实现，让继承的子类去实现，每一个子类有不同的表现
 */
class Rhino extends Animal {
  constructor() {
    super('Rhino');
  }
  eat() {
    return this.name + '吃好的';
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat() {
    return this.name + '吃不好的';
  }
}

/**
 * 修饰符
 * public    公有类型 在类、子类，外部都可访问(默认)
 * protected 保护类型 在类、子类的内可以访问，外部无法访问
 * private   私有类型 在类内可以访问 子类及外部都无法访问
 */

let animal = new Animal('Goat');
Animal.getLag(); // 4

let rhino = new Rhino();
rhino.eat();
let dog = new Dog('小花');
dog.eat();

//console.log(animal.name); //ERROR: 错误 name是私有的

function buildName(firstName: string, lastName?: string) {
  if (lastName) return `${firstName}_${lastName}`;
  else return `${firstName}`;
}

let res1 = buildName('Bob');
console.log('res1', res1);
let res2 = buildName('bod', undefined);
console.log('res2', res2);
//let res3 = buildName('bod','miti','sss'); //ERROR
let res4 = buildName('bod', 'miti');
console.log('res4', res4);

// 接口
interface Config {
  firstname: string;
  lastname: string;
}

function ajax(config: Config) {
  console.log('config.firstname', config.firstname);
  console.log('config.lastname', config.lastname);
}
ajax({
  firstname: '哈哈',
  lastname: '呵呵',
});

// 函数类型的接口
interface encrypt {
  (key: string, value: string): string;
}

let Md5: encrypt = function (key: string, value: string): string {
  return key + value;
};

console.log(Md5('keyname', 'sodo'));

// 可索引接口
interface arrindex {
  [index: number]: string;
}

let arr1: arrindex = ['哈哈', '1'];

let someVal: any = 'this is a string';
// 类型断言， 确定类型
let strLen1: number = (<string>someVal).length; 
let strLen2: number = ( someVal as string ).length
console.log('strLen1', strLen1);
console.log('strLen2', strLen2);
