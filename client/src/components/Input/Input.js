import React from 'react'
import "./Input.css"

const Input = ({ message, setMessage, sendMessage }) => {
    const eraseTextArea = () => {
        document.getElementById("text").value = ""
    }

    const length = message.length < 35 ? "short" : message.length < 75 ? "medium" : message.length < 110 ? "long" : "extraLong"

    return (
        <form className="form fade-in">
            <textarea
                className="text"
                id="text"
                placeholder="Type a message..."
                rows={length === "extraLong" ? 4 : length === "long" ? 3 : length === "medium" ? 2 : 1}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (sendMessage(e), eraseTextArea())}
            />
            <button className="sendButton" aria-label="sendMessage" onClick={e => { sendMessage(e); eraseTextArea() }}>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: "1.7rem" }}></i>
            </button>
        </form>
    )
}

export default Input