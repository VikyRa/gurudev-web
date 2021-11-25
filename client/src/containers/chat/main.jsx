import React from 'react'
import ChatCardsListing from './ChatCardsListing/ChatCardsListing'
import ProfileSection from './ProfileSection/ProfileSection'
import SearchPeople from './SearchPeople/SearchPeople';
import './main.css';
import { ChatSection } from './ChatSection/ChatSection';

/**
* @author
* @function MainChat
**/

export const MainChat = (props) => {
  return(
    <div className="app">
        <div className="left-side">
            <ProfileSection />
            <SearchPeople />
            <ChatCardsListing />
        </div>
        <div className="right-side">
            <ChatSection />
        </div>
    </div>
   )
  }
