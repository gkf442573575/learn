let arr = [
  { type: 1, a: 1 },
  { type: 3, a: 1 },
  { type: 4, a: 1 },
  { type: 1, a: 1 },
  { type: 3, a: 1 },
  { type: 4, a: 1 },
  { type: 5, a: 1 }
]
let indexArr = []
arr.forEach((item, index) => {
  if (item.type === 1) {
    indexArr.push(index)
  }
})
let next = []
indexArr.forEach((item, index) => {
  let start = item + 1
  let end = index === indexArr.length - 1 ? arr.length : indexArr[index + 1]
  let pushitem = arr[item]
  pushitem.isExpand = false
  pushitem.children = arr.slice(start, end)
  next.push(pushitem)
})

console.log(next)
