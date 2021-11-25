import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import Layout from '../../../components/Layout';
import { gernateImages } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import validator from 'validator';
import CommonBanner from '../../../components/UI/Banner/cbanner';

import { useAlert } from "react-alert";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { clearErrors, sigupastrolger, sigupuser } from '../../../actions';
/**
* @author
* @function UserSignup
**/

export const AstrologerSignup = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [userError, setUserError] = useState({});
    const [errors, setErrors] = useState("");
    const [address,setAddress]=useState('');
    const [suitable_time_interview , setSuitable_time_interview]=useState('');
    const { user, token, role, message, isAuthenticated, loading } = useSelector((state) => state.auth);


    const onhandleSignup = (e) => {
        e.preventDefault();
        const isValid = validform();
        if (isValid) {
            const submitdata = {
                first_name: firstName,
                last_name: lastName,
                mobile: mobile,
                email: email,
                password: password,
                address:address,
                suitable_time_interview:suitable_time_interview,
                role:'astrologer'
            }
            dispatch(sigupastrolger(submitdata));
            // dispatch(createreview(submitdata));
        }
    }

    const validform = () => {
        const userError = {}
        let isValid = true;

        if (firstName === '' || firstName === undefined || firstName === null) {
            userError.name = "First Name can not empty";
            isValid = false;
        }
        if (lastName === '' || lastName === undefined || lastName === null) {
            userError.lname = "Last Name can not empty";
            isValid = false;
        }

        if (email === '' || email === undefined || email === null) {
            userError.email = "Email can not empty";
            isValid = false;
        }


        if (mobile === '' || mobile === undefined || mobile === null) {
            userError.mobile = "Mobile can not empty";
            isValid = false;
        }


        if (password === '' || password === undefined || password === null) {
            userError.password = "Password can not empty";
            isValid = false;
        }
        if (password !== cpassword) {
            userError.cpassword = "Password does not match";
            isValid = false;
        }
        setUserError(userError);
        return isValid;
    }


    const onNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            return setMobile(e.target.value)
        } else {
            return setMobile('')
        }
    }

    useEffect(() => {
        if (userError.name) {
            alert.error(userError.name);
            dispatch(clearErrors());
        }
        if (userError.lname) {
            alert.error(userError.lname);
            dispatch(clearErrors());
        }
        if (userError.mobile) {
            alert.error(userError.mobile);
            dispatch(clearErrors());
        }
        if (userError.password) {
            alert.error(userError.password);
            dispatch(clearErrors());
        }
        if (userError.cpassword) {
            alert.error(userError.cpassword);
            dispatch(clearErrors());
        }
        if (userError.email) {
            alert.error(userError.email);
            dispatch(clearErrors());
        }


        if (!isAuthenticated) {
            alert.error(message);
            dispatch(clearErrors());
        }

    }, [dispatch, userError, isAuthenticated, alert, message]);
    if (isAuthenticated) {
        return <Redirect to={`/astrologer/account`} />
    }
    return (
        <Layout>

            <div className="astro-reg pt-5 pb-5">
                <div className="container">
                    <div className="row shadow p-3">
                        <div className="col-12 text-center mb-4">
                            <h2>Astrologer Registration</h2>
                        </div>
                        <form method="post" onSubmit={onhandleSignup}>
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <label value="name" className="mb-0" >First Name</label>
                                    <input type="text" className="form-control" required onChange={(e) => setFirstName(e.target.value)} placeholder="Your Name" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label value="gender" className="mb-0">Last Name</label>
                                    <input type="text" className="form-control" required onChange={(e) => setLastName(e.target.value)} placeholder="Your Name" />
                                </div>
                                <div className="col-6 mb-2">
                                    <label className="mb-0">Your Email</label>
                                    <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" />

                                </div>
                                <div className="col-6 mb-2">
                                    <label className="mb-0">Mobile Number</label>
                                    <input type="tel" className="form-control" required onChange={onNumber} value={mobile} placeholder="Phone Number" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className="mb-0">Password</label>
                                    <input type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className="mb-0">Confirm Password</label>
                                    <input type="password" className="form-control" required onChange={(e) => setCpassword(e.target.value)} placeholder="********" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className="mb-0"> What is your suitable time for an interview ? <span>&#42;</span></label>
                                    <input type="text" className="form-control" required onChange={(e)=>setSuitable_time_interview(e.target.value)} placeholder="Suitable time for an Interview" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Complete Address <span>&#42;</span></label>
                                    <input type="text" className="form-control" required onChange={(e) => setAddress(e.target.value)}  placeholder="Address" />
                                </div>
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-md">Sign Up</button>
                                </div>
                                <div className="col-md-6"><p><strong>Already A Member ?</strong></p></div>
                                <div className="col-md-6 text-right"><p><strong>Go to <Link to="/astrologer/login">Sign In</Link></strong></p></div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>

        </Layout>
    )
}
