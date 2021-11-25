const Astrologer = require('../../models/astrologer/astrologer');
const sendToken = require("../../utiles/jwtToken");
const sendEmail = require("../../utiles/sendEmail");
const crypto = require("crypto");
const ErrorHander = require("../../utiles/errorhander");
const catchAsyncErrors = require("../../common-middleware/catchAsyncErrors");
var validator = require("email-validator");
const Astrologerapi = require('../../utiles/astrologerapi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const shortid = require('shortid');
const User = require('../../models/user/user');








// Register a  User
exports.registerAstrologer = catchAsyncErrors(async (req, res, next) => {
    try {
         User.findOne({ mobile: req.body.mobile }).exec((moerror, mobileuser) => {
            if (mobileuser) return res.status(400).json({
                message: "Mobile already registered"
            });
            const {
                first_name,
                last_name,
                email,
                mobile,
                password,
                address,
                suitable_time_interview,
                role
            } = req.body;
            if (first_name == '') {
                return res.status(400).json({
                    message: "First Name is required"
                });
            } else if (last_name == '' || last_name === null) {
                return res.status(400).json({
                    message: "Last Name is required"
                });
            } else if (password == '' || password === null) {
                return res.status(400).json({
                    message: "Password is required"
                });
            } else if (mobile == '' || mobile === null) {
                return res.status(400).json({
                    message: "Mobile is required"
                });
            } else {
                const _user = new User({
                    first_name,
                    last_name,
                    email,
                    mobile,
                    password,
                    address,
                    suitable_time_interview,
                    role
                });
                _user.save((error, data) => {
                    if (error) {
                        return res.status(400).json({
                            message: "Something went worng",
                            errors: error.message
                        })
                    }
                    if (data) {
                        // options for cookie
                        // const options = {
                        //     expires: new Date(
                        //         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                        //     ),
                        //     httpOnly: true,
                        // };
                        // const token = jwt.sign({ _id: data._id }, process.env.JWT_SCRETE, options);
                        sendToken(data, 201, res);
                    }
                });
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
});


// Login User
exports.loginAstrologer = catchAsyncErrors(async (req, res, next) => {
    const { mobile, password } = req.body;

    // checking if user has given password and email both
  
    if (!mobile || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ mobile:mobile,role:'astrologer' }).select("+password");
  
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    req.session.user = await User.findById(user._id).select('+password');
    // sendToken(user, 200, res);
    const token = user.getJWTToken();
    
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    
   return res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
});



// Logout User
exports.logoutastrologer = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    req.session = null
    res.clearCookie('userId')
     res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//   get single records
exports.singleAstrologer = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}


// update
exports.updateastrologerdetails = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true }).then(updateuser => {
        res.status(200).json({ message: "Astrologer updated successfully ", updateuser });
    }).catch(err => {
        res.status(400).send({ err });
    });

};



// GET PRODUCT FOR WEBSITE 
exports.getAstrologer = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 10;
    const astrologerCount = await User.countDocuments();
  
    const apiFeature = new Astrologerapi(User.find({role:'astrologer'}), req.query)
      .search()
      .filter();
  
    let astrologers = await apiFeature.query;
  
    let filteredAstrologerCount = astrologers.length;
  
    apiFeature.pagination(resultPerPage);
  
    astrologers = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      astrologers,
      astrologerCount,
      resultPerPage,
      filteredAstrologerCount,
    });
  });
