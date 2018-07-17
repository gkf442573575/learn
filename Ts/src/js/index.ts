let a : number = 1;
console.log(a);
let b : [string, number];
b = ['hello', 1];
//b = [1,'hello']; //Error 定义的数组类型必须11对应

enum Color { // ts的枚举
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}
let c : Color = Color.Red;
console.log('c', c);

class Animal {
    private name : string; // readonly啥的还有
    constructor(theName : string) {
        this.name = theName;
    }
}

class Rhino extends Animal {
    constructor() {
        super('Rhino')
    }
}

let animal = new Animal('Goat');
let rhino = new Rhino();
//console.log(animal.name); //ERROR: 错误 name是私有的

function buildName(firstName : string, lastName
    ?
    : string) {
    if (lastName) 
        return `${firstName}_${lastName}`
    else 
        return `${firstName}`
}

let res1 = buildName('Bob');
console.log('res1', res1);
let res2 = buildName('bod', undefined);
console.log('res2', res2);
//let res3 = buildName('bod','miti','sss'); //ERROR
let res4 = buildName('bod', 'miti');
console.log('res4', res4);
