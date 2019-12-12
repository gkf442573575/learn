function returnFor(seachX) {
  const arr = [
    {
      x: 1,
      y: 2
    },
    {
      x: 2,
      y: 3
    }
  ];
  for (let index = 0; index < arr.length; index++) {
    const v = arr[index];
    if (v.x === seachX) {
      return v.y;
    }
  }
}

console.log(returnFor(1));
