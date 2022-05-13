// import express
const express = require("express");
const router = express.Router();

// Routes get, update et delete
const users = require('../controllers/users.js');
const auth = require('../middleware/auth.js');

// routes get, update et delete one user voir controller users, requiert user authentifié
// Get All Users
// router.get('/users', showUsers);
// Get Single User
router.get('/users/:user_id', auth, users.showUserById);
// Update User
router.put('/users', auth, users.updateUser);
// Delete User
router.delete('/users/:user_id', users.deleteUser);

module.exports = router;