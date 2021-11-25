import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, NavLink, Link } from 'react-router-dom';
import { AstrologerSignout } from '../../actions';
import {DropdownMenu} from '../MaterialUI/index';

/**
* @author
* @function AstrologerHeader
**/

export const AstrologerHeader = (props) => {
  const dispatch = useDispatch();
  const {user,token,role,isAuthenticated,loading} = useSelector(state => state.auth);

  const logout = () => {
    dispatch(AstrologerSignout());
  }
  return(
    <>
     <DropdownMenu 
        menu={<a className="fullName">{user ? user.first_name: null}</a>}
        menus={[
          {
            label: "My Profile",
            to: `/astrologer/account`,
            icon: null,
          },
          {
            label: "My Chat",
            to: `/chats`,
            icon: null,
          },

          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    
   
    </>
   )

 }