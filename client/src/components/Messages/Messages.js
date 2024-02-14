import React, { useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from "../Message/Message.js"
import "./Messages.css"

const Messages = ({ messages, name, users }) => {

    useEffect(() => {
        users.length < 2 ? localStorage.setItem('messages', []) : localStorage.setItem('messages', JSON.stringify(messages))
    }, [messages, users])

    return (
        <ScrollToBottom className="messages fade-in">
            {messages.map((message, index) =>
                <div key={index}>
                    <Message message={message} name={name} />
                </div>
            )}
        </ScrollToBottom>
    )
}

export default Messages