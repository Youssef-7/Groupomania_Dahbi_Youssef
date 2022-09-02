const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

// import function from controller
const topic_messagesCtrl = require("../controllers/topic_messages.js");

router.post('/topic_messages', auth, multer, topic_messagesCtrl.createMessage)

router.get('/topic_messages/parent', auth, topic_messagesCtrl.showParentTopicMessages);

router.put('/topic_messages/:p_id', auth, multer, topic_messagesCtrl.verifUpdateMessage);

router.delete('/topic_messages/:p_id', auth, topic_messagesCtrl.deleteMessage);

router.post('/topic_messages/like/:p_id', auth, multer, topic_messagesCtrl.createLikeMessage);


router.delete('/topic_messages/dislike/:p_id', auth, multer, topic_messagesCtrl.deleteLikeMessage);

// export router
module.exports = router;