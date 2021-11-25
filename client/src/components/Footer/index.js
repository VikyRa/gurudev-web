import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Models from '../UI/Models'
import { getwebinfo } from '../../actions';

/**
* @author
* @function Footer
**/

export const Footer = (props) => {
  const dispatch = useDispatch();
  const {setting} = useSelector((state) => state.setting);


  useEffect(() => {
    dispatch(getwebinfo(4));
}, [dispatch]);
  return (
    <>
 <Models />
      <footer className="pt-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h3>About Alo</h3>
              <p className="mb-3" dangerouslySetInnerHTML={{__html:setting.content}}></p>
            </div>
            <div className="col-md-3">
              <h3>Quick Link</h3>
              <ul className="mb-3">
                <li><a href="index.html">Home</a></li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact-us.html">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Service</h3>
              <ul className="mb-3">
                <li><a href="#">Service</a></li>
                <li><a href="#">Service 1</a></li>
                <li><a href="#">Service 2</a></li>
                <li><a href="#">Service 3</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Contact Us</h3>
              <p className="mb-2"><i className="fa fa-map-marker"></i> {setting.address}</p>
              <p className="mb-2"><i className="fa fa-phone"></i> {setting.phone}</p>
              <p className="mb-2"><i className="fa fa-envelope"></i> {setting.email}</p>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p>Copyright 2018 by Alo. All Rights Reserved.</p>
              </div>
              <div className="col-sm-6">
                <p className="float-right">Design by <a href="#">Paridhiwebtech</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )

}