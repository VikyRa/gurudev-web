import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, createContactAction, getabout, servicelist } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';
import { mallLlist, homebloglist, getwebinfo, getvision, getmision } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import validator from 'validator';
import CommonBanner from '../../components/UI/Banner/cbanner';
import { Commonpage } from '../../components/UI/commonpage';

/**
* @author
* @function About
**/

export const Contact = (props) => {
    const dispatch = useDispatch();
    const { service } = useSelector((state) => state.homeservice);
    const { allmall } = useSelector((state) => state.homemall);
    const { review } = useSelector((state) => state.review);
    const { blog } = useSelector((state) => state.hblog);
    const { setting } = useSelector((state) => state.setting);
    const { message, success, error, loading } = useSelector((state) => state.ccontact);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [messages, setMessages] = useState('');
    const [userError, setUserError] = useState({});

    const adduserForm = (e) => {
        e.preventDefault();
        // return true;
        const isValid = formValidate();
        if (isValid) {
            const submitdata = {
                name: name,
                email: email,
                mobile: mobile,
                message: messages,
            }
            dispatch(createContactAction(submitdata));

        }
    }
    // FORM VALIDATION FUNCTION CODE START
    const formValidate = () => {
        const userError = {}
        let isValid = true;


        // name validation code start
        if (name === '' || name === undefined || name === null) {
            userError.nameerror = "First Name can not empty";
            isValid = false;
        }

        // EMAIL VALIDATION
        if (!validator.isEmail(email)) {
            userError.emailerror = "Enter valid Email!";
            isValid = false;
        }

        // mobile validation
        if (!validator.isMobilePhone(mobile)) {
            userError.phoneerror = "Mobile Number is Invalid";
            isValid = false;
        }


        setUserError(userError);
        return isValid;

    }


    useEffect(() => {


        dispatch(homebloglist());
        dispatch(getwebinfo(4));
        if (success) {
            setName('');
            setEmail('');
            setMobile('');
            setMessages('');
        }
    }, [dispatch, success]);

   const onNumber = (e)=>{
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           return setMobile(e.target.value)
        }else{
            return setMobile('')
        }
     }


    return (
        <Layout title={`Contact Us`}>
            <CommonBanner value={`Contact Us`} />

            <div className="reach pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Get in Touch</h3>
                            {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {message}</div> : null}
                            {success ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                {message}</div> : null}
                            <form onSubmit={adduserForm} method="post">
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name" />
                                        {
                                            userError ? <span className="text-dagner">{userError.nameerror}</span> : null
                                        }
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input type="text" name="phone" maxLength="10" id="phone" onChange={onNumber} value={mobile} className="form-control" placeholder="Phone No." />
                                        {
                                            userError ? <span className="text-dagner">{userError.phoneerror}</span> : null
                                        }
                                    </div>
                                    <div className="col-12 mb-2">
                                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email ID" />
                                        {
                                            userError ? <span className="text-dagner">{userError.emailerror}</span> : null
                                        }
                                    </div>
                                    <div className="col-12 mb-2"><textarea onChange={(e)=>setMessages(e.target.value)} className="form-control" rows="3" placeholder="Message/Comment"></textarea></div>
                                    <div className="col-12 mb-2 text-right"><button type="submit" className="btn btn-md btn-primary form-control">SEND</button></div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="shadow p-5">
                                <p><i className="fa fa-map-marker"></i> {setting.address} </p>
                                <p><i className="fa fa-phone"></i> {setting.phone} {setting.phone_two ? `, ${setting.phone_two}` : null}</p>
                                <p><i className="fa fa-envelope"></i> {setting.email}</p>
                                <p><i className="fa fa-globe"></i> www.alo.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Commonpage review={review} blog={blog} />
        </Layout>
    )

}

