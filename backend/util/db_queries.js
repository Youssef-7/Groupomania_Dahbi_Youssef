const connection = require("../config/database.js");
const fs = require('fs');

// récupération des infos de la ligne selon l'id du message
exports.get_message_by_id = (id, callback) => {
    connection.query('SELECT * FROM post_messages  WHERE p_id = ?', [id], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

// récupération de l'image selon l'id de l'utilisateur
exports.get_picture_url_by_tm_user_id = (id, callback) => {
    connection.query('SELECT p_image_url  FROM post_messages WHERE p_user_id  =?', [id], (err, results) => {
        if (err) { 
            callback(err, null); 
        } else { 
            console.log(results);
            callback(null, results); 
        }
    });
}

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

// suppression des images des messages enfants d'un parent commun en vue de suppression du message parent
exports.delete_child_images_by_parent_id = (parent_id, callback) => {
    connection.query('SELECT p_image_url FROM post_messages WHERE p_parent = ?', [parent_id], (err, results) => {
        console.log(results);
        if (err) { // gestion de l'erreur
            callback(err, null);
        } else {
            for (let i = 0; i < results.length; i++) { // boucle for pour récupérer la totalité des images dont le parent_id = 0
                const el = results[i];
                if (el.p_image_url) { // si on obtient un résultat dans la boucle : il existe au moins une image
                    try {
                        if (fs.existsSync(el.p_image_url)) { // vérification si le fichier existe grace à existsSync
                            //FileSystem : suppression des images/liens du "filesystem"
                            fs.unlinkSync(el.p_image_url)
                        }
                    } catch (err) { // gestion de l'erreur
                        console.log(err);
                    }
                }
            }
            callback(null, results);
        }
    });
}

// exports.getImageUrlByTmTitle = (tm_title, callback) => {
//     connection.query('SELECT tm_picture FROM topic_messages WHERE tm_title = ?', [tm_title], (err, results) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, results);
//         }
//     })
// }