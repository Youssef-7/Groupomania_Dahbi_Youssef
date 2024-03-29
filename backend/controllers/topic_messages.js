const topicMessages = require("../models/topic_messageModel.js");
exports.createMessage = (req, res) => {

    const data = JSON.parse(req.body.topic);
 // JSON.parse(req.body.message)
    console.log(data)
    if (data.p_titre == ''|| data.p_text == '') {
        return
    }
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
    if (data.p_titre == ''|| data.p_text == '') {
        return
    }
    data['p_image_url']= req.hasOwnProperty('file') ? req.file.path : null;
    data['p_id']= id; 
    console.log( req.body.topic)
    req.body.topic = data;
    topicMessages.verifUpdate(req, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Supprimer un message : DELETE Message from Database
exports.deleteMessage = (req, res) => {
    const id = req.params.p_id;
    topicMessages.verifDelete(req, (err, results) => {
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
