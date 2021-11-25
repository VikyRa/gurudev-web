const User = require('../../models/user/user');
require("dotenv").config();
const sendToken = require("../../utiles/jwtToken");
const sendEmail = require("../../utiles/sendEmail");
const ErrorHander = require("../../utiles/errorhander");
const catchAsyncErrors = require("../../common-middleware/catchAsyncErrors");
var validator = require("email-validator");
const uniquId = require("uniqid");
const path = require("path");
const Formidable = require("formidable");
const crypto = require("crypto");
const request = require("request");
const Razorpay = require("razorpay");
let orderId;

// var instance = new Razorpay({
//     key_id: process.env.KEY_ID,
//     key_secret: process.env.SECREAT_KEY,
//   });


exports.paymentWallate = async  (req, res) => {
 
  // var options = {
  //   amount: 10 * 100, // amount in the smallest currency unit
  //   currency: "INR",
  //   receipt: uniquId(),
  // };
  // instance.orders.create(options, function (err, order) {
  //   if (err) {
      
  //     return res.status(500).json({
  //       error: err,
  //     });
  //   }
  //   console.log(order.id);
  //   orderId = order.id;
  //   res.json(order);
  // });
  try {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
        amount: 50000, // amount in smallest currency unit
        currency: "INR",
        receipt: uniquId(),
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
} catch (error) {
    res.status(500).send(error);
}
};


// paymentCallback

// exports.paymentCallback = (req, res) => {
//   const form = Formidable();
//   form.parse(req, (err, fields, files) => {
//     if (fields) {
//       console.log("FIELDS", fields);
//       const hash = crypto
//         .createHmac("sha256", process.env.SECREAT_KEY)
//         .update(orderId + "|" + fields.razorpay_payment_id)
//         .digest("hex");

//       if (fields.razorpay_signature === hash) {
//         const info = {
//           _id: fields.razorpay_payment_id,
//           razorpay_order_id: fields.razorpay_order_id,
//         };
//         const order = new orderSchema({
//           _id: info._id,
//           orders: fields.razorpay_order_id,
//         });

//         order.save((err, data) => {
//           if (err) {
//             res.status(400).json({
//               error: "Not able to save in Db",
//             });
//           } else {
//             res.redirect(
//               `${process.env.FRONTEND}/payment/status/${fields.razorpay_payment_id}`
//             );
//           }
//         });
//       } else {
//         res.send("ERROR");
//       }
//     }
//   });
// };


exports.paymentCallback = (req,res)=>{
  try {
    // getting the details back from our font-end
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.SECREAT_KEY);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature){
      return res.status(400).json({ msg: "Transaction not legit!" });
    }else{
          // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        // request('https://[YOUR_KEY_ID]:[YOUR_KEY_SECRET]@api.razorpay.com/v1/payments/pay_29QQoUBi66xm2f', function (error, response, body) {
        //   console.log('Response:', body);
        // });
          res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    }
        


} catch (error) {
    res.status(500).send(error);
}
}