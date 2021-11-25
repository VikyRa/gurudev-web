import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, servicelist } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { api, gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';
import { mallLlist, homebloglist } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import './profile.css';
import { Commonpage } from '../../components/UI/commonpage';
import logo from '../../image/logo.png';
import axios from 'axios';
import axiosIntance from '../../helpers/axios';
/**
* @author
* @function Wallet
**/

export const Wallet = (props) => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState("");
    const { user, token, role, isAuthenticated, loading, message } = useSelector((state) => state.auth);


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(e) {
        e.preventDefault();

       
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const senddata={
            amount:'10',
            userId:user._id,
            name:user.first_name,
            email:user.email,
            mobile:user.mobile

        }
        const result = await axiosIntance.post(`/paymentWallate`,senddata);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_5rwAbstMn6NfIn", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axiosIntance.post(`/payment/callback`, data);

                if (result.data.msg === 'success') {
                    props.history.push(`/success/${result.data.paymentId}`);
                } else {
                    props.history.push(`/error/${result.data.paymentId}`);
                }
            },
            prefill: {
                name: user.first_name,
                email: user.email,
                contact: user.mobile,
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <Layout title={`Wallet`}>


            <div className="payment pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h3 className="mb-3 text-center">Pay Now</h3>
                            <form onSubmit={displayRazorpay} method="post">
                                <div className="row">
                                    <div className="col-12">

                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="row mb-4">
                                                   

                                                    <div className="col-12 bg-light p-3 border-bottom">
                                                        <div className="form-group row">
                                                            <label for="inputPassword" className="col-sm-4 col-form-label">Amount</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" className="form-control" placeholder="Enter amount" onChange={(e)=>setAmount(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-md btn-primary form-control">Finish and Pay</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
