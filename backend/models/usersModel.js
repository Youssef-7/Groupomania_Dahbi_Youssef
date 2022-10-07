// import connection
const connection = require("../config/database.js");
const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement

// Insert into Users in Database table users
exports.insertUsers = (data, result) => {
    connection.query("SELECT * FROM usagers WHERE u_email = ?", [data.u_email],(err, results)=> {
        if (!results[0]) {
    connection.query("INSERT INTO usagers (u_pseudo, u_email, u_pwd) VALUES (?, ?, ?)", [data.u_pseudo, data.u_email, data.u_password], (err, results) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, results);
            return results;
        }
    });
    }
     else { result(null, results); }
})
}

// fonction find user by email
exports.getUserByEmail = async (email, result) => {
    connection.query("SELECT * FROM usagers WHERE u_email = ?", [email], (err, results) => {
        if (err) {
            // console.log(err);
            result(err, null);
            return err;
        }
        else {
            result(null, results);
            return results;
        }
    });
}


