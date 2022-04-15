const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement
const jwt = require('jsonwebtoken'); // standard qui permet l'échange de jetons

const userData = require('../models/usersModel.js');
const { createPool } = require('mysql2/promise');

// signup
exports.signup = (req, res) => { // async = (req, res) => {
    try {
        const pseudo = req.body.front_pseudo;
        const email = req.body.front_email;
        const pwd = req.body.front_password;
        if (!pseudo || !email || !pwd) { res.status(400).json(`${!pseudo ? "pseudo" : !email ? "email" : "pwd"} manquant`); }
        else {
            bcrypt.hash(req.body.front_password, 10)
            .then(hash => {
                userData.insertUsers({
                    u_pseudo: req.body.front_pseudo, // requiert le pseudo du corps de la requête
                    u_email: req.body.front_email, // adresse email du corps de la requête
                    u_password: hash // le mot de passe est stocké crypté
                    // date et id générés automatiquement et level default = 1
                },(err, results) => {
                    if(err) res.status(500).json({err})
                    else res.status(201).json('Utilisateur créé');
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
        if (!email || !pwd) { res.status(400).json(`${!email ? "email" : "pwd"} manquant`); }
        
        userData.getUserByEmail(email, (err, results) => {
            try {
                const u_pwd  = results[0].u_pwd;
                bcrypt.compare(pwd, u_pwd)
                .then(valid => {
                if (!valid) {
                    return res.status(401).json({error: "Mot de passe incorrect"});
                }
                res.status(200).json({ 
                    level: results[0].u_role,
                    userId: results[0].u_id,
                    token: jwt.sign (
                        { userId: results[0].u_id },
                        'RANDOM_TOKEN_SECRET', // clé secrète de l'encodage - en production : 'string' longue et aléatoire
                        { expiresIn: '24h' }
                        )
                    });
                })
                .catch(err => res.status(500).json({ err }));
            } catch (error) {
                return res.status(404).json({error: "Utilisateur non trouvé"});
            }
        });
    } catch (error) {
        res.status(403).json({ error: 'requête non autorisée'});
    }
};
// exports.login = (req, res) => {
//     try {
//         const email = req.body.front_email;
//         const pwd = req.body.front_password;

//         if (email) {
//             connection.query("SELECT * FROM users WHERE u_email = ?", [email], (err, results) => { 
//                 if(err) {console.log("error: ", err);} 
//                 else {
//                     console.log('results: ', results);
//                     const user = results[0];
//                     console.log(user);
//                     bcrypt.compare(pwd, user.u_password)
//                     .then(valid => {
//                         if (!valid) {
//                             return res.status(401).json({error: "Mot de passe incorrect"});
//                         }
//                         res.status(200).json({ 
//                             userId: user.u_id,
//                             token: jwt.sign (
//                                 { userId: user.u_id },
//                                 'RANDOM_TOKEN_SECRET', // clé secrète de l'encodage - en production : 'string' longue et aléatoire
//                                 { expiresIn: '24h' }
//                             )
//                         });
//                     })
//                     .catch(error => res.status(500).json({ error }));
//                 }
//             });
//         } else {res.status(400).json(`${!email ? "email" : "pwd"} manquant`);}
//     } catch (error) {
//         res.status(403).json({ error: 'requête non autorisée'});
//     }
// }
