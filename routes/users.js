const router = require('express').Router();
const { getUsers, getUserById, getOwnerInfo } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/me', getOwnerInfo);
module.exports = router;
