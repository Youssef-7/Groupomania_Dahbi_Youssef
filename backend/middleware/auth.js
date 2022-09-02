const jwt = require('jsonwebtoken'); // package jsonwebtoken pour vérifier les tokens
const dotenv = require("dotenv").config();
module.exports = (req, res, next) => {  
 // tryconsole.log(process.env) ...catch pour réduire les erreurs liés à tous les problèmes possibles
    try {
        const token = req.headers.authorization.split(' ')[1]; // on extrait le token du header authorization de la requête entrante (2e élément du tableau retourné avec le bearer et le token)
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY); // verify permet de décoder le token grâce au package jsonwebtoken : si token invalide = génère une erreur
        const userId = decodedToken.userId;
        const level = decodedToken.u_role; // on extrait l'id utilisateur du token
        if (req.body.userId && req.body.userId !== userId) { // si la demande contient un id user : on le compare à celui extrait du token
            throw 'ID utilisateur non valable'; // s'ils sont différents, on génère une erreur
        } else {
            next(); // si pas d'erreur on passe l'exécution de la fonction avec next();
        }
    } catch (error) { // affiche les erreurs 
        res.status(401).json({ error: error | 'requête non authentifiée'});
    }
};
