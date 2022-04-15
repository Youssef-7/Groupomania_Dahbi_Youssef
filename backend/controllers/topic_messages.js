const topicMessages = require("../models/topic_messageModel.js");

// Créer un message (parent 0) : INSERT Topic_message to Database
exports.createMessage = (req, res) => {
    // console.log(req);

    const data = req.body;
 // JSON.parse(req.body.message)
    data['front_picture_url'] = req.hasOwnProperty('file') ? req.file.path : null;
    console.log(data)
    topicMessages.insertTopicMessages(data, (err, results) => {
        
        if (err){res.send(err);} 
        else {res.json(results);}
    });
};

exports.showChildTopicMessages = (req, res) => {
    const parent_id = req.params.parent_id;
    // console.log('hello world');
    topicMessages.getChildMessages(parent_id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

exports.showParentTopicMessages = (req, res) => {
    topicMessages.getParentMessages((err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modifier un message : UPDATE Topic_message to Database
exports.updateMessage = (req, res) => {
    const data = req.body; // JSON.parse(req.body.message)
    data['p_image_url']= req.hasOwnProperty('file') ? req.file.path : null;
    console.log("update"+ data)
    topicMessages.updateMessage(data, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modérer un message : UPDATE moderation FROM 
exports.updateModeration = (req, res) => {
    const data = req.body;
    topicMessages.moderateMessage(data, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Supprimer un message : DELETE Message from Database
exports.deleteMessage = (req, res) => {
    const id = req.params.p_id;
    topicMessages.deleteMessageById(id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};
// exports.deleteMessage = (req, res) => {
//     const id = req.params.tm_id;
//     topicMessages.deleteMessageById(id, (err, results) => {
//         if (err){res.send(err);}
//         else{res.json(results);}
//     });
// };

// Voir un seul message (parent 0) + affichage de ses enfants (réponses)
// exports.showMessageByTitle = (req, res) => {
//     topicMessages.getMessageByTitle(req.params.id, (err, results) => {
//         if (err){res.send(err);}
//         else {res.json(results);}
//     });
// };

// Supprimer une conversation (message parent 0 + enfants) : DELETE Message to Database
// exports.deleteConversation = (req, res) => {
//     const title = req.params.tm_title;
//     topicMessages.deleteConversationByTitle(title, (err, results) => {
//         if (err){res.send(err);}
//         else{res.json(results);}
//     });
// };