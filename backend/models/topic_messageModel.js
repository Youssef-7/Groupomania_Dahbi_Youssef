// les queries viennent ici
// import connection
const fs = require('fs');
const connection = require("../config/database.js");
const db_queries = require("../util/db_queries.js");
// const { get_message_by_id, get_picture_url_by_id, delete_child_images_by_parent_id } = require('../util/db_queries.js');

// Insert Topic_message to Database = création d'un message
exports.insertTopicMessages = (data, result) => {
    connection.query("INSERT INTO post_messages (p_parent, p_user_id, p_titre, p_text, p_image_url) VALUES (?, ?, ?, ?, ?)", [data.p_parent, data.p_user_id, data.p_titre, data.p_text, data.p_image_url], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else {
            db_queries.get_message_by_id(results.insertId, (err, res) => {
                if (err) { result(err, null); }
                else { result(null, res); }
            })
        }
    });
}

// Get Parent Topics = trouver tous les messages parents = 0 (titre principal)
exports.getParentMessages = (result) => {
    connection.query("SELECT p.*, u.u_pseudo FROM post_messages p INNER JOIN usagers u ON p.p_user_id = u.u_id WHERE p.p_parent= 0 ORDER BY p_date_published  DESC", (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Get Child Topics = trouver tous les messages dont le parent = 0
exports.getChildMessages = (parent_id, result) => {
    connection.query("SELECT p.*, u.u_pseudo FROM post_messages p INNER JOIN usagers u ON p.p_user_id = u.u_id WHERE p.p_parent = ? ORDER BY p_date_published", [front_parent], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Update Topic_message to Database = modifier un message
exports.updateMessage = (data, result) => {
    if (data.p_image_url) { // si on update l'image depuis le DOM
        db_queries.get_picture_url_by_tm_id(data.p_id, (err, results) => { // appel de la querie de ../utils/db_queries
            console.log(results) // vérif des résultats
            if (err) { result(err, null); }
            else {
                if (results.length > 0 && results[0].p_image_url) { // si on a un résultat
                    const pic_url = results[0].p_image_url; //on récupère l'url de l'image
                    try {
                        fs.unlinkSync(pic_url); // on supprime l'image de la bdd et du dossier images
                        console.log("image deleted");
                    } catch (err) {
                        result(err, null);
                        console.error(err);
                    }
                } // puis on met à jour la base de données en insérant une nouvelle image
                connection.query("UPDATE post_messages SET p_titre  = ?, p_text  = ?, p_image_url  = ? WHERE p_id  = ?",
                    [data.p_titre, data.p_text, data.p_image_url, data.p_id], (err, results) => {
                    if (err) { console.log("error: ", err); result(err, null); }
                    else {
                        connection.query("UPDATE post_messages  SET p_titre  = ? WHERE p_parent  = ?",
                            [data.p_titre, data.p_id], (err, results) => {
                            if (err) { console.log("error: ", err); result(err, null); }
                            else {
                                result(null, results);
                            }
                        });
                    }
                });
            }
        })
    } else { // gestion si on update pas l'image
        connection.query("UPDATE post_messages  SET p_titre  = ?, p_text  = ? WHERE p_id  = ?", // MAJ de la BDD (titre et contenu du message) selon l'ID du message
            [data.p_titre, data.p_text, data.p_id], (err, results) => {
            if (err) { console.log("error: ", err); result(err, null); }
            else {
                connection.query("UPDATE post_messages SET p_titre  = ? WHERE p_parent  = ?",
                    [data.p_titre, data.p_id], (err, results) => {
                    if (err) { console.log("error: ", err); result(err, null); }
                    else {
                        result(null, results);
                    }
                });
            }
        });
    }
}

// Delete Message via id utilisateur
exports.deleteTopicByUserId = (id, result) => {
    db_queries.get_picture_url_by_tm_user_id(id, (err, results) => { // récupération de l'image selon l'id du message
        // console.log(results); // URL de l'image parent si tm_parent = tm_id
        if (err) { result(err, null); } // gestion de l'erreur
        else { // gestion de la suppresion du message
            // console.log(results);
            if (results.length > 0) { // si on a une image : on obtient un tableau results contenant un objet dont on extrait l'url
                try {
                    for (let i = 0; i < results.length; i++) {
                        const picture_url = results[i].p_image_url;
                        // console.log("picture_url : ", picture_url);
                        if (fs.existsSync(picture_url)) { // vérification de l'existence du fichier
                            fs.unlinkSync(picture_url) //FileSystem : suppression des images/liens du "filesystem"
                        }
                    }
                    connection.query("DELETE FROM post_messages WHERE p_user_id = ? ", [id], (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                        else { result(null, results); }
                    });
                } catch (err) { // gestion de l'erreur
                    result(err, null);
                    console.error(err);
                }   
            }
        }
    })
}

// Delete Message from Database + gestion des fichiers images de la bdd
exports.deleteMessageById = (id, result) => {
    db_queries.get_picture_url_by_tm_id(id, (err, results) => { // récupération de l'image selon l'id du message
        // console.log(results); // URL de l'image parent si tm_parent = tm_id
        if (err) { result(err, null); } // gestion de l'erreur
        else { // gestion de la suppresion du message
            if (results.length > 0) { // si on a une image : on obtient un tableau results contenant un objet dont on extrait l'url
                const picture_url = results[0].p_image_url;
                try {
                    if (fs.existsSync(picture_url)) { // vérification de l'existence du fichier
                        fs.unlinkSync(picture_url) //FileSystem : suppression des images/liens du "filesystem"
                    }
                } catch (err) { // gestion de l'erreur
                    result(err, null);
                    console.error(err);
                }
            }
            // et suppression de l'image de(s) l'élément(s) enfant(s) puis du(des) message(s) enfant(s)
            db_queries.delete_child_images_by_parent_id(id, (err, results) => { // gestion de la suppression des images de l'enfant
                if (err) {
                    result(err, null);
                } else {
                    // une fois l'image supprimée, suppresion de la table topic_message des lignes dont l'id = tm_parent ou tm_id
                    connection.query("DELETE FROM post_messages WHERE p_parent = ? or p_id = ? ", [id, id], (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                        else { result(null, results); }
                    });
                }
            })
        }
    })
}


// Creer un like 
exports.likeMessage = (data, result) => {
    connection.query("SELECT * FROM like_message WHERE like_p_id = ? AND like_u_id = ?", [data.like_p_id, data.like_u_id],(err, results)=> {
        if (!results) {
    connection.query( "INSERT INTO like_message (like_u_id, like_p_id) VALUES (?, ?)",[data.like_u_id, data.like_p_id], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
                else { connection.query("SELECT COUNT(*) AS like_count FROM like_message WHERE like_p_id = ?", [data.like_p_id],  (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                            else { connection.query("UPDATE post_messages  SET p_like = ? WHERE p_id = ?", [results[0].like_count, data.like_p_id],(err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
           // metttre a jour la table de liasion, compte le nombre de like (select count where postid = post id, update "UPDATE post_messages  SET like = ? WHERE p_id = ?", + route like et route dislike if (data.like) {connection.query("INSERT INTO like_message (like_u_id, like_p_user_id, like_p_id) VALUES (?, ?, ?, ?);", [data.like_u_id, data.like_p_user_id, data.like_p_id], (err, results) => {
             })
            };
        });
        };

    });
 }
        else { result(null, results); }
})
}
exports.unlikeMessage = (data, result) => {
    connection.query( "DELETE FROM like_message WHERE like_p_id = ? AND like_u_id = ?",[data.like_p_id, data.like_u_id], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
                else { connection.query("SELECT COUNT(*) AS like_count FROM like_message WHERE like_p_id = ?", [data.like_p_id],(err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                            else { connection.query("UPDATE post_messages  SET p_like = ? WHERE p_id = ?",[results[0].like_count, data.like_p_id],(err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
           // metttre a jour la table de liasion, compte le nombre de like (select count where postid = post id, update "UPDATE post_messages  SET like = ? WHERE p_id = ?", + route like et route dislike if (data.like) {connection.query("INSERT INTO like_message (like_u_id, like_p_user_id, like_p_id) VALUES (?, ?, ?, ?);", [data.like_u_id, data.like_p_user_id, data.like_p_id], (err, results) => {
             })
            };
        });
        };

    });
}

exports.deleteAllLikes = (data, result) => {
    connection.query("DELETE FROM like_message WHERE like_p_id = ? ",[data.like_p_id],(err, results) => {
        if (err) {console.log("error: ", err); result(err, null);}
        else{ result(null, results[0]);}
    })
}
// Get one topic
// exports.getMessageByTitle = (title, result) => {
//     connection.query("SELECT * FROM topic_messages WHERE tm_title = ?", [title], (err, results) => {
//         if (err) { console.log("error: ", err); result(err, null); }
//         else { result(null, results[0]); }
//     });
// }
// Delete conversation
// exports.deleteConversationByTitle = (title, result) => {
//     connection.query("DELETE FROM topic_messages WHERE tm_title = ?", [title], (err, results) => {
//         if (err) { console.log("error: ", err); result(err, null); }
//         else { result(null, results[0]); }
//     });
// }
// Récupérer les Messages d'un seul utilisateur
// exports.userMessages = (id, result) => {
//     connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE u.u_id = ? ORDER BY tm.tm_id ASC", 
//     [id.u_id], (err, results) => {
//         if(err) {console.log("error: ", err); result(err, null);} 
//         else {result(null, results);}
//     });
// }