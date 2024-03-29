// import connection
const fs = require('fs');
const connection = require("../config/database.js");
const db_queries = require("../util/db_queries.js");
// Insert Topic_message to Database = création d'un message
exports.insertTopicMessages = (data, result) => {
    connection.query("INSERT INTO post_messages (p_parent, p_user_id, p_titre, p_text, p_image_url) VALUES (?, ?, ?, ?, ?)", [data.p_parent, data.p_user_id, data.p_titre, data.p_text, data.p_image_url], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
                else { result(null, results); }
    });
}

// Get Parent Topics = trouver tous les messages parents = 0 (titre principal)
exports.getParentMessages = (result) => {
    connection.query("SELECT p.*, u.u_pseudo FROM post_messages p INNER JOIN usagers u ON p.p_user_id = u.u_id WHERE p.p_parent= 0 ORDER BY p_date_published  DESC", (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}
exports.verifUpdate = (req, result) => {
    const data = req.body.topic
    console.log(data)
    if(req.auth.level == '1') {this.updateMessage (data, result)} else {
        connection.query("SELECT * from post_messages WHERE p_user_id = ? AND p_id = ?",[req.auth.userId, data.p_id], (err, results) => {
            if (results[0]) {this.updateMessage (data, result) }
        })

    }

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
                    // une fois l'image supprimée, suppresion de la table topic_message des lignes dont l'id = p_parent ou p_id
                    connection.query("DELETE FROM post_messages WHERE p_parent = ? or p_id = ? ", [id, id], (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                        else { result(null, results); }
                    });
        }
    })
}
exports.verifDelete = (req, result) => {
    console.log(req.auth)
    const id = req.params.p_id
    if(req.auth.level == '1') {this.deleteMessageById (id, result)} else {
        connection.query("SELECT * from post_messages WHERE p_user_id = ? AND p_id = ?",[req.auth.userId, id], (err, results) => {
            if (results[0]) {this.deleteMessageById (id, result) }
        })

    }

}
// Creer un like 
exports.likeMessage = (data, result) => {
    connection.query("SELECT * FROM like_message WHERE like_p_id = ? AND like_u_id = ?", [data.like_p_id, data.like_u_id],(err, results)=> {
        if (!results[0]) {
    connection.query( "INSERT INTO like_message (like_u_id, like_p_id) VALUES (?, ?)",[data.like_u_id, data.like_p_id], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
                else { connection.query("SELECT COUNT(*) AS like_count FROM like_message WHERE like_p_id = ?", [data.like_p_id],  (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                            else { connection.query("UPDATE post_messages  SET p_like = ? WHERE p_id = ?", [results[0].like_count, data.like_p_id],(err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
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
        else { result(null, results); }
             })
            };
        });
        };

    });
}

exports.deleteAllLikes = (p_id, result) => {
    connection.query("DELETE FROM like_message WHERE like_p_id = ? ",[p_id],(err, results) => {
        if (err) {console.log("error: ", err); result(err, null);}
        else{ result(null, results[0]);}
    })
}
