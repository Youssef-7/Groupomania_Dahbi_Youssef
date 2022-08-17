// import express from 'express';
const express = require ('express');
const router = express.Router();

// import auth from '../middleware/auth';
// import multer from '../middleware/multer-config';
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

// import function from controller
const topic_messagesCtrl = require("../controllers/topic_messages.js");


// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------

// Create new Topic_message (insert to Database)
// route temporaire sans auth
// router.post('/topic_messages', auth, multer, topic_messagesCtrl.createMessage)
router.post('/topic_messages', auth, multer, topic_messagesCtrl.createMessage)

// Get all topics
// router.get('/topic_messages', auth, topic_messagesCtrl.showTopicMessages);

// Get all topics (parent 0)// route temporaire sans auth
router.get('/topic_messages/parent', auth, topic_messagesCtrl.showParentTopicMessages);

// Get all childs where parent_id = 0// route temporaire sans auth
router.get('/topic_messages/child/:parent_id', auth, topic_messagesCtrl.showChildTopicMessages);

// Update Topic_message to Database// route temporaire sans auth
router.put('/topic_messages/:p_id', auth, multer, topic_messagesCtrl.updateMessage);

// Update Moderation// route temporaire sans auth
router.put('/topic_messages/moderation', auth, topic_messagesCtrl.updateModeration);

// Delete Message from Database// route temporaire sans auth
router.delete('/topic_messages/:p_id', auth, topic_messagesCtrl.deleteMessage);

router.post('/topic_messages/like/', auth, multer, topic_messagesCtrl.createLikeMessage);
// router.post('/topic_messages/like/:p_id', auth, multer, topic_messagesCtrl.createLikeMessage);

router.delete('/topic_messages/:like_id', auth, multer, topic_messagesCtrl.deleteLikeMessage);

// Get message by title
// router.get('/topic_messages', auth, topic_messagesCtrl.showMessageByTitle);
// Delete Message by title (all conversation : parent 0 +  children)
// router.delete('/topic_messages', auth, topic_messagesCtrl.deleteConversation);

// export router
module.exports = router;