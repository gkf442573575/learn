function a(callback){
  callback(3)
}

// let b = a(i=>{
//   return i
// })

var c;
a(i=>{
  c = i
})
console.log(c)