function c() {
  return {
    d: 1
  };
}
let d = [
  {
    e: 1
  },
  {
    f: 2
  }
];
let a = [
  {
    b: 3
  },
  c(),
  ...d
];
console.log(a);
