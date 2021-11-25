const User = require('../../models/user/user');
const sendToken = require("../../utiles/jwtToken");
const sendEmail = require("../../utiles/sendEmail");
const crypto = require("crypto");
const ErrorHander = require("../../utiles/errorhander");
const catchAsyncErrors = require("../../common-middleware/catchAsyncErrors");
var validator = require("email-validator");


// Register a  User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
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
          password
        } = req.body;
        if (first_name == '') {
          return res.status(400).json({
            message: "First Name is required"
          });
        } else if (last_name == '' || last_name === null) {
          return res.status(400).json({
            message: "Last Name is required"
          });
        }  else if (password == '' || password === null) {
          return res.status(400).json({
            message: "Password is required"
          });
        } else if (mobile == '' || mobile === null) {
          return res.status(400).json({
            message: "Mobile is required"
          });
        }  else {
          const _user = new User({
            first_name,
            last_name,
            email,
            mobile,
            password
          });
          _user.save((error, data) => {
            if (error) {
              return res.status(400).json({
                message: "Something went worng",
                errors: error.message
              })
            }
            if (data) {
              sendToken(data, 201, res);
            }
          });
        }
      });

  } catch (err) {
    return res.status(400).json({ error: err });
  }
});


// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { mobile, password } = req.body;

  // checking if user has given password and email both

  if (!mobile || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ mobile:mobile,role:'user' }).select("+password");

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
exports.logout = catchAsyncErrors(async (req, res, next) => {
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




// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});




// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});





// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});




// GET PRODUCT FOR WEBSITE 
exports.getusers = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 10;
  const userCount = await User.countDocuments();

  const apiFeature = new Astrologerapi(User.find(), req.query)
    .search()
    .filter();

  let users = await apiFeature.query;

  let filtereduserCount = users.length;

  apiFeature.pagination(resultPerPage);

  users = await apiFeature.query;

  res.status(200).json({
    success: true,
    users,
    userCount,
    resultPerPage,
    filtereduserCount,
  });
});