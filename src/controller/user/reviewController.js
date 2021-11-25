const Review = require('../../models/user/reviewModel');
const catchAsyncErrors = require('../../common-middleware/catchAsyncErrors');
const ErrorHander = require('../../utiles/errorhander');

exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        email,
        description,
    } = req.body;

    const order = await Review.create({
        name,
        email,
        description,
    }).then((data) => {

        return res.status(201).json({
            message: "Thanks for feedback"
        });
    }).catch((error) => {
        return res.status(400).json({
            error: error
        });
    });
});


exports.getReview = catchAsyncErrors(async (req, res, next) => {
    await Review.find({}).then((review) => {
        return res.status(200).json({
            review
        });
    }).catch((error) => {
        return res.status(400).json({
            error: error
        });
    });
});