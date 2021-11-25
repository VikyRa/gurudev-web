import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Banner from '../UI/Banner';
import './style.css';
import Models from '../UI/Models';
import { getwebinfo, signout } from '../../actions';
import MetaData from './MetaData';
import { UserHeader } from './UserHeader';
import { AstrologerHeader } from './AstrologerHeader';
import {DropdownMenu} from '../MaterialUI/index';
import logo from '../../image/logo.png';

// import 'react-owl-carousel2/style.css'; //Allows for server-side rendering.
// import '../../css/style.css';
// import '../../css/responsive.css';

/**
* @author
* @function Header
**/




export const Header = (props) => {

  const dispatch = useDispatch();
  const { user, token, role, isAuthenticated, loading } = useSelector(state => state.auth);
  const { setting } = useSelector((state) => state.setting);
  // const {user,token,role,error,isAuthenticated,loading} = useSelector((state) => state.auth);
  const [menulink, setMenulink] = useState('');

  useEffect(() => {
    dispatch(getwebinfo(4));
    if (isAuthenticated) {
      if (role === 'user') {
        setMenulink(<UserHeader />);
      } else if (role === 'astrologer') {
        setMenulink(<AstrologerHeader />)
      }
    } else {
      const menu = <DropdownMenu
        menu={<a className="fullName"><i className="fa fa-user"></i>  Loin</a>}
        menus={[
          {
            label: "User",
            to: `/user/login`,
            icon: null,
          },

          {
            label: "Astrologer",
            to: `/astrologer/login`,
            icon: null,
          },
        ]}
      />
      setMenulink(menu)
    }
  }, [dispatch, isAuthenticated, role, user]);
  // logout function





  // check user login or not
  // const randerLoggedInLinks = () => {

  //   return (
  //     <>

  //     </>
  //   );
  // }

  // const randerNonLoggedInLinks = () => {
  //   return (
  //     <>
  //     </>
  //   );
  // }

  return (
    <>
      <MetaData title={props.title} />
      <header className="pt-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-6">
              <Link to="/"><img src={logo} alt="" className="logo" title="" /></Link>
            </div>
            <div className="col-lg-7 col-md-9 col-sm-6 my-auto main text-center mx-auto">
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="about-us">About Us</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/astrologer">Astrologer</Link></li>
                  <li><Link to="/product">Alo Mall</Link></li>

                  <li><Link to="/contact-us">Contact Us</Link></li>
                  {/* <li><Link to="#">Admin</Link></li>
                  <li><Link to="#">Astrologer Dashboard</Link></li> */}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 my-auto">
              {menulink}
              <ul className="header-btn">

                <li><Link to="#"><i className="fa fa-phone"></i> {setting.phone}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid menu-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12 pt-2 pb-2">
                <span className="respnav"><i className="fa fa-bars" aria-hidden="true"></i></span>
                <nav>
                  <ul>
                    <li><Link to="#">Service</Link></li>
                    <li><Link to="#">Service</Link></li>
                    <li><Link to="#">Service 1</Link></li>
                    <li><Link to="#">Service 2</Link></li>
                    <li><Link to="#">Service 3</Link></li>
                    <li><Link to="#">Service 4</Link></li>
                    <li><Link to="#">Service 5</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  )

}