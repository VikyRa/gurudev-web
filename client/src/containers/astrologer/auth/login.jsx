import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import Layout from '../../../components/Layout';
import { gernateImages } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import validator from 'validator';
import CommonBanner from '../../../components/UI/Banner/cbanner';
import image from '../../../image/di.jpg'
import { useAlert } from "react-alert";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { astrologerlogin, clearErrors, sigupuser, userlogin } from '../../../actions';
/**
* @author
* @function UserLogin
**/

export const AstrologerLogin = (props) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  
  const [userError, setUserError] = useState({});
  const [errors, setErrors] = useState("");
  const {user,token,role,isAuthenticated,loading,message} = useSelector((state) => state.auth);
  

  const onhandlelogin =(e)=>{
      e.preventDefault();
      const isValid = validform();
      if (isValid) {
          const submitdata ={
            mobile:mobile,
            password:password
          }
          dispatch(astrologerlogin(submitdata));
          // dispatch(createreview(submitdata));
      }
  }

  const validform = () =>{
      const userError = {}
      let isValid = true;


      if (mobile === '' || mobile === undefined || mobile === null) {
          userError.mobile = "Mobile can not empty";
          isValid = false;
      }


      if (password === '' || password === undefined || password === null) {
          userError.password = "Password can not empty";
          isValid = false;
      }

      setUserError(userError);
      return isValid;
  }


  const onNumber = (e)=>{
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         return setMobile(e.target.value)
      }else{
          return setMobile('')
      }
   }

   useEffect(()=>{
     
      if(userError.mobile){
          alert.error(userError.mobile);
          dispatch(clearErrors());
      }
      if(userError.password){
          alert.error(userError.password);
          dispatch(clearErrors());
      }
     
      if(!isAuthenticated){
          alert.error(message);
          dispatch(clearErrors());
      }
      if(isAuthenticated){
        return <Redirect to={`/astrologer/account`} />
    }
   },[dispatch,userError,isAuthenticated,alert,message]);

   if(isAuthenticated){
    return <Redirect to={`/astrologer/account`} />
  }
  return (
    <Layout>
      <div className="login pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="col-12 my-auto">
              </div>
            </div>
            <div className="col-md-8 right left shadow">
              <h3 className="mb-2 mt-3 text-center">Astrologer's Login</h3>
              <p className="text-center mb-0"><img src={image} className="img-fluid" alt="" title="" /></p>
              <form style={{padding:"40px"}} onSubmit={onhandlelogin}>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <input type="text" className="form-control" onChange={onNumber}  value={mobile} placeholder="+91-9876-xxx-xxx" />
                  </div>
                  <div className="col-md-12 mb-2">
                    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  placeholder="**********" />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-md form-control">Login</button>
                    <p className="text-center mb-0 pt-2 pb-2 font-weight-bold">Or</p>
                    <Link to="/astrologer/signup" className="btn btn-md form-control" style={{background:'#e6a708',color: '#fff'}}>Sign Up</Link>

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
