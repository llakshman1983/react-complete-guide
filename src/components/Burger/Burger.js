import React from 'react';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Burger.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  
    let transforedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((arr, curr) => {
        console.log('Arr: ' + arr);
        console.log('curr: ' + curr);
        return arr.concat(curr);
    }, []); 

    if (transforedIngredients.length === 0) {
        transforedIngredients =  '<p> Add Ingredients </p>';
    }

  
/* 
   const transforedIngredients = Object.keys(props.ingredients).map(igKey => {
       console.log(igKey);
       console.log("---" + props.ingredients[igKey]);
       console.log("..." + [...Array(props.ingredients[igKey])]);
        //return [...Array(props.ingredients[igKey])].map((_, i) => {        
          //  return <BurgerIngredient key={igKey + i} type={igKey}/>
        //});
    }); 
*/
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>           
            { transforedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;