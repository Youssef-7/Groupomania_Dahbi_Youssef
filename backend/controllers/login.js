const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement
const jwt = require('jsonwebtoken'); // standard qui permet l'échange de jetons
const dotenv = require("dotenv").config();
const userData = require('../models/usersModel.js');
const { createPool } = require('mysql2/promise');
const passwordValidator = require('password-validator');
var passwordParams = new passwordValidator();
passwordParams
.is().min(8)                                    // Minimum 8 caractères,                                 
.has().uppercase()                              // Majuscule obligatoire,
.has().lowercase()                              // Minuscule obligatoire,
.has().digits(2)                                // 2 chiffres,
.has().not().spaces();                         // Pas d'espaces

var validationEmail = (valeur) => {
return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/.test(valeur);
}
// signup
exports.signup = (req, res) => { // async = (req, res) => {
    try {
        const pseudo = req.body.front_pseudo;
        const email = req.body.front_email;
        const pwd = req.body.front_password;
        if (validationEmail(email) == false) {
           res.status(400).json( 'Veulliez renseigner un email valide');
        }
        if (!passwordParams.validate(pwd)) {
    res.status(400).json( 'Veulliez renseigner un mot de pass valide avec au minimum : 8 caractères, une majuscule, une minuscule, 2 chiffre et sans espace');
  }     
        if (!pseudo || !email || !pwd ) { res.status(400).json(`${!pseudo ? "pseudo" : !email ? "email" : "pwd"} manquant`); }
        else if (passwordParams.validate(pwd)) {
            bcrypt.hash(req.body.front_password, 10)
            .then(hash => {
                userData.insertUsers({
                    u_pseudo: req.body.front_pseudo, // requiert le pseudo du corps de la requête
                    u_email: req.body.front_email, // adresse email du corps de la requête
                    u_password: hash // le mot de passe est stocké crypté
                     // date et id générés automatiquement et level default = 
                },(err, results) => {
                    if(err) res.status(500).json({err})
                    else res.status(201).json({message :'Utilisateur créé ! Veuillez vous connectez'});
                });               
            })
            .catch(error => res.status(500).json({ error }));
        }
    } catch (error) {
        res.status(400).json('utilisateur déjà existant');
    }
};

// login
exports.login = async (req, res, next) => {

    try {
        const email = req.body.front_email;
        const pwd = req.body.front_password;
        if (email == '' || pwd == '') { return res.status(401).json("Champs vide !") }
        
        userData.getUserByEmail(email, (err, results) => {
            try {
                const u_pwd  = results[0].u_pwd;
                bcrypt.compare(pwd, u_pwd)
                .then(valid => {
                if (!valid) {
                    return res.status(401).json("Mot de passe incorrect");
                }
                res.status(200).json({ 
                    level: results[0].u_role,
                    userId: results[0].u_id,
                    token: jwt.sign (
                        {userId: results[0].u_id, level: results[0].u_role },
                        `${process.env.SECRET_TOKEN_KEY}`, // clé secrète de l'encodage - en production : 'string' longue et aléatoire
                        { expiresIn: '24h' },
                        ),
                    });
                })
                .catch(err => res.status(500).json({ err }));
            } catch (error) {
                return res.status(404).json("Utilisateur non trouvé");
            }
        });
    } catch (error) {
        res.status(403).json({ error: 'requête non autorisée'});
    }
};

