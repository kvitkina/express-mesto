const router = require('express').Router()
const path = require ('path')
const readFile = require('../utils/read-file.js')
const jsonUsersPath = path.join(__dirname, '..', 'data', 'users.json')

router.get ('/users', (req, res) => {
  readFile(jsonUsersPath)
  .then (data => res.send(data))
  .catch (err => res.send(err))
})

router.get('users/:id', (req,res) => {
  const { id } = req.params
  readFile(jsonUsersPath)
  .then (data => {
    const userToFind = data.find(user => user._id === id)
    return userToFind
  })
  .then (user => {
    if(!user) {
      return res.status(404).send({message: "Нет пользователя с таким id"})
    }
    res.send(user)
  })
  .catch (err => res.send(err))
})
module.exports = router