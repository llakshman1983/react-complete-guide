//const { Component } = require("react");

import React, {Component} from 'react';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
    
    state = {        
        purchasing: false       
    }

    /* 
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
*/
   
/* removeIngredientHandler = (type) => {
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
   */
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    componentDidMount = () => {
        // only the component thats loaded from route has match, history... property.., not sub component
        console.log('BurgerBuilder: componentDidMount : this.props > ', this.props);
        this.props.onInitIngredients();       
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
        //this.setState({purchasable : sum > 0});
       return sum > 0;
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

   
   
    purchaseContinueHandler = () => {
     /* Commented for adding route */
     
        //this.props.history.push('/checkout');

       /*  const queryParams = [];
        for (let i in this.state.ingredients) {
            console.log('-- this.state.ingredients -- ', i);
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        */
        this.props.history.push('/checkout');
    }
     
    // Lifecyle method
    render() {
        const disableLessButtonInfo = {
           ...this.props.ings
        };

        for (let ky in disableLessButtonInfo) {
            disableLessButtonInfo[ky] = disableLessButtonInfo[ky] <= 0;
        }
        let orderSummary = null;        
        let burger = this.props.error ? <p> Cant get ingredients </p>: <Spinner/>;
        if (this.props.ings) {
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableLessButtonInfo} 
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>
            </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }       
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                 </Modal>                
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient())

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
