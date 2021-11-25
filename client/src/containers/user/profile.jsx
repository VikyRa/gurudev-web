import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, servicelist } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';
import { mallLlist, homebloglist } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import './profile.css';
import { Redirect } from 'react-router';
import { Commonpage } from '../../components/UI/commonpage';

/**
* @author
* @function UserProfile
**/

export const UserProfile = (props) => {
  const {role}=useSelector((state)=>state.auth);
  if(role === 'astrologer'){
    return <Redirect to='/' />
  }
  
  return(
    <Layout title={`Account`}>UserProfile</Layout>
   )
  }
