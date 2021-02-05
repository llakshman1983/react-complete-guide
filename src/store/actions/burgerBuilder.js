// Action Creator
import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const setIngredients = (ingrdeients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingrdeients: ingrdeients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredient = () => {
    return dispatch => {
         axios.get('https://react-my-burger-5389d-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {               
                //this.setState({ingredients: response.data})
                dispatch(setIngredients(response.data))
            }).catch(error => {
               // this.setState({error: true});
               dispatch(fetchIngredientsFailed);
            });        
    };
}

