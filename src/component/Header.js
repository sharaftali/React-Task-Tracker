import PropTypes from 'prop-types';
import React from 'react'
import { useLocation } from 'react-router';
import Button from './Button';

const Header = (propes) => {

    const { title, showEvent, showAdd } = propes;
    
    const location = useLocation();

    
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === "/" && <Button
                text={showAdd ? "Close" : "Add"}
                color={showAdd ? "red" : "green"}
                onClick={showEvent}
            />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
    showEvent: false
}

Header.prototype = {
    title: PropTypes.string.isRequired
}

export default Header
