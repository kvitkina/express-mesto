const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const cardsRoutes = require ('./routes/cards.js')
const usersRoutes = require ('./routes/users.js')


app.use(express.static(path.join(__dirname, 'public')))
app.use('/', usersRoutes)
app.use('/', cardsRoutes)
app.use('*', (req, res, next) => {
  res.status(404).send({message: 'Запрашиваемый ресурс не найден'})
})


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})