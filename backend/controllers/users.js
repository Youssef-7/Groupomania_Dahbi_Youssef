// Import function from User Model
// import { getUserById, insertUsers, updateUserById, deleteUserById } from "../models/usersModel.js";
// const insertUsers = require("../models/usersModel.js");
// const getUserById = require("../models/usersModel.js");
// const updateUserById = require("../models/usersModel.js");
// const deleteUserById = require("../models/usersModel.js");
const user = require("../models/usersModel.js");
const message = require("../models/topic_messageModel");

// Get Single User for profil
exports.showUserById = (req, res) => {
    const user_id = req.params.user_id;
    user.getUserById(user_id, (err, results) => {
        if (err){ res.send(err); }
        else { res.json(results); }
    });
}

// Update User
exports.updateUser = (req, res) => {
    const data = req.body;
    user.updateUserById(data, (err, results) => {
        if (err){ res.send(err); }
        else{ res.json(results); }
    });
}
 
// Delete User
exports.deleteUser = (req, res) => {
    const id = req.params.u_id;
    message.deleteTopicByUserId(id, (err, results) => {
        if (err){ res.send(err); }
        else {
            user.deleteUserById(id, (err, results) => {
                if (err){ res.send(err); }
                else{ res.json(results); }
            });
        }
    })
}