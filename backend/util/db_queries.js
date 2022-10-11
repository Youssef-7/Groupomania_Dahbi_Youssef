const connection = require("../config/database.js");
const fs = require('fs');


// récupération de l'image selon l'id du message
exports.get_picture_url_by_tm_id = (id, callback) => {
    connection.query('SELECT p_image_url  FROM post_messages WHERE p_id  = ?', [id], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}


