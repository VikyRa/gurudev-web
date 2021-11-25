import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import './Chat.css';


/**
* @author
* @function Chat
**/

export const Chat = ({ sessionId, friendName, chats }) => {
    const renderMsg = (propsmsg) => {
    //     if (msg.type === "file") {
    //       if (msg.theme === "audio") {
    //         return <audio src={msg.value} controls />;
    //       } else if (msg.theme === "image") {
    //         return <img style={{ width: "100px" }} src={msg.value} />;
    //       }
    //     }
    //     return msg.value;
      };
      return (
        <ScrollToBottom className="chat-section">
            <div className="chat you">
                <span className="name">Brajesh</span>
                <p className="msg">This is new message</p>
                <span className="time">10:59 PM</span>
            </div>

            <div className="chat me">
                <span className="name">Brajesh</span>
                <p className="msg">This is new message</p>
                <span className="time">10:59 PM</span>
            </div>
          {/* {chats.map((chat) => (
            <div
              key={chat._id}
              className={`chat ${sessionId === chat.senderId ? "you" : "me"}`}
            >
              {sessionId === chat.senderId ? (
                <span className="name">{friendName}</span>
              ) : null}
              <p className="msg">{renderMsg(chat.msg)}</p>
              <span className="time">{shortFormatTime(chat.time)}</span>
            </div>
          ))} */}
        </ScrollToBottom>
      );
  
}
