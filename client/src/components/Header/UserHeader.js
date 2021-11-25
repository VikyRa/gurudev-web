import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, NavLink, Link } from 'react-router-dom';
import { userSignout } from '../../actions';
import {DropdownMenu} from '../MaterialUI/index';
import './style.css'

/**
* @author
* @function UserHeader
**/

export const UserHeader = (props) => {
  const dispatch = useDispatch();
  const {user,token,role,isAuthenticated,loading} = useSelector(state => state.auth);

  const logout = () => {
    dispatch(userSignout());
  }
  return(
    <>    
    {/* <li className="active"><Link to="/user/account"><i className="fa fa-user"></i> User</Link></li> */}
       <DropdownMenu 
        menu={<a className="fullName">{user ? user.first_name: null}</a>}
        menus={[
          {
            label: "My Profile",
            to: `/user/account`,
            icon: null,
          },
          {
            label: "Wallate",
            to: `/user/wallet`,
            icon: null,
          },

          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    </>
   )

 }