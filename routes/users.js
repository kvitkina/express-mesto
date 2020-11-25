const router = require('express').Router();
const { getUsers, getUserById, getOwnerInfo } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getOwnerInfo);
router.get('/users/:id', getUserById);
module.exports = router;
