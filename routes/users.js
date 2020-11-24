const router = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/me', getUserById);
module.exports = router;
