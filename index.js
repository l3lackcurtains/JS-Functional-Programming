const express = require('express')

const app = express()

app.listen(3000)
console.log('App listening to port 3000')

require('./app')
