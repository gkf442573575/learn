const express = require('express')
const path = require('path')

const app = express()



app.use(express.static(path.join(__dirname, 'dist')))


app.listen(13888, () =>{
  console.log(`server run at 13888`)
})