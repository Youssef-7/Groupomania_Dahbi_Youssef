const topicMessages = require("../models/topic_messageModel.js");
// faire un require de auth , lutiliser dans le model pour comparer
// Créer un message (parent 0) : INSERT Topic_message to Database
exports.createMessage = (req, res) => {

    const data = JSON.parse(req.body.topic);
 // JSON.parse(req.body.message)
    console.log(data)
    data['p_image_url'] = req.hasOwnProperty('file') ? req.file.path : null;
    topicMessages.insertTopicMessages(data, (err, results) => {
        if (err){res.send(err);} 
        else {res.json(results);}
    });
};
exports.showParentTopicMessages = (req, res) => {
    topicMessages.getParentMessages((err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modifier un message : UPDATE Topic_message to Database
exports.verifUpdateMessage = (req, res) => {
    const id = req.params.p_id;
    const data = JSON.parse(req.body.topic) // JSON.parse(req.body.message)
    data['p_image_url']= req.hasOwnProperty('file') ? req.file.path : null;
    data['p_id']= id; 
    console.log( data)
    topicMessages.verifUpdate(data, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Supprimer un message : DELETE Message from Database
exports.deleteMessage = (req, res) => {
    const id = req.params.p_id;
    topicMessages.deleteMessageById(id, (err, results) => {
        if (err){res.send(err);}
        else{topicMessages.deleteAllLikes(id, (err, results) =>{
        if (err){res.send(err);}
        else{res.json(results);}
    });
    }
    });
};
exports.createLikeMessage = (req, res) => {
    const id = req.params.p_id;
    const data = JSON.parse(req.body.topic);
    data['like_p_id']= id;
        console.log(data)
    topicMessages.likeMessage(data, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};
exports.deleteLikeMessage = (req, res) => {
    const id = req.params.p_id;
    const data = JSON.parse(req.body.topic);
    data['like_p_id']= id;
        console.log(data)
        topicMessages.unlikeMessage(data, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};
