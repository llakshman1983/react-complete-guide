import React, { Component } from 'react';

import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functional component, doesnt have to be a class.
    
    componentDidUpdate () {
        console.log("-- Did Update --");
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: 
                    {this.props.ingredients[igKey]}
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
                <p><strong>Price: $ {this.props.price}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
    
   
}

export default OrderSummary;