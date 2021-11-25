const express = require("express");
const { registerUser, loginUser, logout, forgotPassword,updatePassword, resetPassword,getUserDetails, getusers } = require("../../controller/user/user");
const router = express.Router();
const {isAuthenticatedUser} =require('../../common-middleware/auth');
const { createReview, getReview } = require("../../controller/user/reviewController");
const { paymentWallate,paymentCallback } = require("../../controller/user/paymentController");
router.post("/register",registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.post('/password/forgot',forgotPassword);
router.put("/password/reset/:token",resetPassword);

router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.post('/review/add',createReview);
router.get('/review',getReview);
router.post('/paymentWallate',paymentWallate);

router.post("/payment/callback", paymentCallback);

router.get('/users',getusers);


module.exports = router;