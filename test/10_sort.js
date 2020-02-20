let objArr = [
  'name',
  'mobile',
  'sex',
  'age',
  'credit',
  'live_address',
  'door',
  'company',
  'source',
  'destination',
  'trip_mode',
  'car_no',
  'temperature',
  'temperature_type',
  'danger',
  'health_notes',
  'close',
  'party',
  'other',
  'pic'
]
var cloums = ['name','other','mobile']
let arr = []
objArr.forEach(item=>{
  if(cloums.includes(item)){
    arr.push(item)
  }
})
console.log(arr)