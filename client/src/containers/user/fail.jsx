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
* @function Fail
**/

export const Fail = (props) => {
  return(
    <div>Fail</div>
   )
  }
