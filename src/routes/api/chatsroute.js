const express = require('express');
const { isAuthenticatedUser } = require('../../common-middleware/auth');
const { savechat, getchatlist, getchatlistbyid,mychats } = require('../../controller/api/chat');
const router = express.Router();

router.post('/savechat',isAuthenticatedUser,savechat);
router.get('/chatlist',isAuthenticatedUser,getchatlist);
router.get('/chat/:chatId',isAuthenticatedUser,getchatlistbyid);
// router.get('/mychat',mychats)

module.exports = router;