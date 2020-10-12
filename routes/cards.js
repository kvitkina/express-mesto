const router = require('express').Router()
const path = require ('path')
const readFile = require('../utils/read-file.js')
const jsonCardsPath = path.join(__dirname, '..', 'data', 'cards.json')

router.get ('/cards', (req, res) => {
  readFile(jsonCardsPath)
  .then (data => res.send(data))
  .catch (err => res.send({massage: "Ошибка чтения файла"}))
})
module.exports = router