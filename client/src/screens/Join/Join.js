import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Join.css"

const Join = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className="joinOuterContainer fade-in">
            <div className="joinInnerContainer">
                <h1 className="heading">Join <i className="fa-solid fa-arrow-right-to-bracket"></i></h1>
                {room && <p style={{ color: "white" }}>Joining Room: {room} &ensp; {name && `As: ${name}`}</p>}
                <div>
                    <input placeholder="Room" className="joinInput" type="text" onKeyUp={(event) =>
                        event.key !== "Enter" ?
                            setRoom(event.target.value) :
                            (name !== '' && room !== '') && document.getElementsByTagName('button')[0].click()} />
                </div>
                <div>
                    <input placeholder="Name" className="joinInput mt-20" type="text" onKeyUp={(event) =>
                        event.key === "Enter" ?
                            (name !== '' && room !== '') && document.getElementsByTagName('button')[0].click() :
                            setName(event.target.value)} />
                </div>
                {/* if there is no value for 'name' or 'room', prevent default and stay in the same route, else continue as usual  */}
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='button'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join