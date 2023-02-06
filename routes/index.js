const express = require('express')
const router = express.Router()

router.get('/hello', (req, res) => {
  res.render('hello')
})

router.get('/', (req, res) => {
  res.render('content', { data: 'Kita dapat mengirimkan data dengan cara ini' })
})

module.exports = router