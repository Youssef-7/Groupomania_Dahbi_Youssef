// import express
const express = require("express");
const router = express.Router();

// Routes login + signup
const loginCtrl = require('../controllers/login.js');

// routes signup et login voir controller login
router.post('/signup', loginCtrl.signup); // requête post pour s'enregistrer
router.post('/login', loginCtrl.login); // requête post pour se 'log'

module.exports = router;