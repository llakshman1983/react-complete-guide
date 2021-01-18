import React  from 'react'
import classes from './Input.css';

const Input = (props) => {
    let inputElem = null;
    
    switch(props.inputType) {
        case('text'):
            inputElem = <input {...props} className={classes.InputElement}/>;
            break;
        case('textarea'):
            inputElem = <textarea {...props} className={classes.InputElement}/>;
            break;
        default:
            inputElem = <input {...props} className={classes.InputElement} />;

        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                {inputElem}
            </div>
        );
    }
}
