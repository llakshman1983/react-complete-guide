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
        ingredients: null,  
        /* {
            bacon: 0,
            cheese: 0,
            meat: 0 ,
            salad: 0
        }, */
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
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

    componentDidMount = () => {
        // only the component thats loaded from route has match, history... property.., not sub component
        console.log('BurgerBuilder: componentDidMount : this.props > ', this.props);

        axios.get('https://react-my-burger-5389d-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                console.log('INGREDIENTS FROM GET', response.data);
                this.setState({ingredients: response.data})
            }).catch(error => {
                this.setState({error: true});
            });        
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
     /* Commented for adding route */
     
        //this.props.history.push('/checkout');

        const queryParams = [];
        for (let i in this.state.ingredients) {
            console.log('-- this.state.ingredients -- ', i);
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
     
    // Lifecyle method
    render() {
        const disableLessButtonInfo = {
            ...this.state.ingredients
        };

        for (let ky in disableLessButtonInfo) {
            disableLessButtonInfo[ky] = disableLessButtonInfo[ky] <= 0;
        }
        let orderSummary = null;        
        let burger = this.state.error ? <p> Cant get ingredients </p>: <Spinner/>;
        if (this.state.ingredients) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableLessButtonInfo} 
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>
            </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;

        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axios);
