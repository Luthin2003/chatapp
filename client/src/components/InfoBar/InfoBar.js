import React from 'react'
import "./InfoBar.css"

const InfoBar = ({ room, users, showAllUsers, setShowAllUsers }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i className="fa-solid fa-comment-dots roomIcon"></i>
                <h3>Room: {room}</h3>
                <i className="onlineIcon fa-solid fa-circle ml-10" alt="online icon"></i>
                <h3 className="">Online: {users.length}</h3>
            </div>
            <div className="rightInnerContainer">
                {showAllUsers === false &&
                    <button className="showUsers" aria-label="showUsers" onClick={() => setShowAllUsers(!showAllUsers)}>
                        <i className="fa-solid fa-user-group" />
                    </button>
                }
                <a href="/"
                    aria-label="exitRoom"
                    // delete the jokes from localStorage if the user don't want them anymore
                    onClick={() => users.length >= 2 && !window.confirm("Do you wish to save the messages in local Storage for the next time?")
                        && localStorage.setItem('messages', [])}><i className="fa-solid fa-circle-xmark exitButton"></i></a>
            </div>
        </div>
    )
}

export default InfoBar