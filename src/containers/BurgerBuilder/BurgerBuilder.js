//const { Component } = require("react");

import React, {Component} from 'react';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.25
};

class BurgerBuilder extends Component {
    //constructor(props) {
        //super(props)    ;
        //this.state = {}
    //}
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0 ,
            salad: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        
        // State should be created in an immutable way
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0) {
            return;
        }
        const updatedCount = oldCount - 1;
        
        // State should be created in an immutable way
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
   
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState(ingredients) {
       /* const ingredients = {
            ...this.state.ingredients
        };
        */
        // State object to array
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {return sum + el;}, 0);
        this.setState({purchasable : sum > 0});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Continue');
    }

    // Lifecyle method
    render() {
        const disableLessButtonInfo = {
            ...this.state.ingredients
        };

        for (let ky in disableLessButtonInfo) {
            disableLessButtonInfo[ky] = disableLessButtonInfo[ky] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                 </Modal>
                <Burger 
                    ingredients={this.state.ingredients}/>
                <div>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableLessButtonInfo} 
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;