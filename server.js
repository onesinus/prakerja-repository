const express = require('express')
const app = express()
const port = 3000
const mainRoute = require('./routes')

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.use('/', mainRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})