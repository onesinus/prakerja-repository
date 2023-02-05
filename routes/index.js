const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/test', (req, res) => {
  res.render('content', { data: 'Kita dapat mengirimkan data dengan cara ini' })
})

module.exports = router