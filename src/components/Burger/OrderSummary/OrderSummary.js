import React from 'react';

import Aux from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: 
                {props.ingredients[igKey]}
            </li>)
    });
    return (
        <Aux>
            <h3>Your Order</h3> 
            <p>Delicious Burger with ingredients</p>
            <u1>
                {ingredientSummary}
            </u1>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;