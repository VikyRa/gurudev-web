import React from 'react';
import './ChatForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactMic } from "react-mic";
import {
    faSmile,
    faPaperclip,
    faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

/**
* @author
* @function ChatForm
**/

export const ChatForm = (props) => {
    return (
        <div className="chat-form">
            <div className="action-btn">
                <FontAwesomeIcon className="icon-block" icon={faSmile} />
                <FontAwesomeIcon className="icon-block" icon={faPaperclip} />
            </div>
            <input  className="chat-input" placeholder="message" />
            <FontAwesomeIcon icon={faMicrophone} className="icon-block" />
        </div>
    )
}
