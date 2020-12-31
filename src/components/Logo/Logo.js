import React from 'react';

import logoImg from '../../assets/images/burger-logo.png'
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logoImg} alt="Logo"/>
    </div>
);

export default logo;