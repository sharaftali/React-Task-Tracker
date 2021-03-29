import React from 'react'
import {FaTimes} from 'react-icons/fa';

const Task = propes => {
    const { id, text, day, reminder, onDelete, onToggle } = propes;
    
    return (
        <div className= {`task ${reminder ? 'reminder': ''}`} >
            <h3>
                {text}
                <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={() => onDelete(id)} />
            </h3>
            <p onClick={() => onToggle(id)} >{ day }</p>
        </div>
    )
}

export default Task
