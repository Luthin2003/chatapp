import React from 'react'
import "./OnlineUsers.css"

const OnlineUsers = ({ setShowAllUsers, users }) => {
    return (
        <div className="allUsers fade-in">
            <button className="returnButton" onClick={() => setShowAllUsers(false)}>
                <i className="fa-solid fa-arrow-right-long"></i>
            </button>
            <h2 className="allUsersHeader fade-in">Currently Connected Users :</h2>
            {users.map(({ name }) =>
                <div key={name} className="activeItem">
                    <div className="onlineUser">
                        <i className="onlineIcon fa-solid fa-circle" style={{ fontSize: ".6rem" }}></i>
                        {name}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OnlineUsers