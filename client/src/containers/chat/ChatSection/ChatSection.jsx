import React from 'react'
import { Chat } from '../Chat/Chat'
import { ChatForm } from '../ChatForm/ChatForm'
import { ChatHeader } from '../ChatHeader/ChatHeader'

/**
* @author
* @function ChatSection
**/

export const ChatSection = (props) => {
  return(
    <div>
        <ChatHeader />
        <Chat />
        <ChatForm />
    </div>
   )
  }
