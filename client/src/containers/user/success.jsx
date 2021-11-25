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

/**
* @author
* @function Success
**/

export const Success = (props) => {
    const dispatch = useDispatch();
 
    const paymentid = props.match.params.id;
    const getpaymentDetail= async (paymentid)=>{
        await axios.get(`https://${process.env.REACT_APP_KEY}:${process.env.REACT_APP_SECREAT_KEY}@api.razorpay.com/v1/payments/${paymentid}`)
    }

    useEffect(()=>{
        getpaymentDetail(paymentid)
    },[])
  return(
    <div>Success</div>
   )
  }
