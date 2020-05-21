let a = [
  {
    id: 1,
    a: 2,
  },
  {
    id: 2,
    a: 3,
  },
  {
    id: 1,
    a: 2,
  },
];
let hash = {};
a = a.reduce((arr, item) => {
  hash[item.id] ? '' : (hash[item.id] = true && arr.push(item));
  return arr;
}, []);
console.log('arr', a);
