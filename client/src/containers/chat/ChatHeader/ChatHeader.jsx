import React from 'react';
import './ChatHeader.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";

/**
* @author
* @function ChatHeader
**/

export const ChatHeader = (props) => {
    const profileImg =null;
    return (
        <div className="chat-header">
          <div className="img-container">
            {profileImg ? (
              <img
              alt="image"
            //   src={profileImg}
            srcsrc="https://thumbs.dreamstime.com/b/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846325.jpg"
            />
            ) :
            <FontAwesomeIcon className="icon-block" icon={faUser} /> }
          </div>
          <div className="card-detail">
              <h4 className="title">
                  {/* {name ? name : ""} */}
                  Brajesh
                  </h4>
              <p className="desc">
              Online
                {/* {isOnline ? "Online" 
                : `Last seen ${updatedAt ? formatDate(updatedAt) : ""}`} */}
              </p>
          </div>
          <div className="acion-items">
              <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
      );
  }
