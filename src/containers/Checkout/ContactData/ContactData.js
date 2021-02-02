import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
class ContactData extends Component {
    state = {
        orderForm: {            
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false
            },               
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false
            },
           deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {
                },
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }
   
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            console.log('rules.required', isValid)
        }
        
        if (rules.minLength) {            
            isValid = value.trim().length >= rules.minLength && isValid;
            console.log('value.trim.length - rules.minLength', value.trim().length, isValid);
        }

        if (rules.maxLength) {
            console.log('rules.maxLength', isValid)
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log("Contact Data: orderHandler  " +  this.props.ingredients);
        const formData = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        this.setState({loading: true});       
        const burgerOrder = {
            ingredients: this.props.ings,
            // Recalculate at server side           
            price: this.props.price,
            orderData: formData            
                          
        }       
        axios.post('/orders.json', burgerOrder).then(response => {
            //console.log(response);
            // alert('Order Placed. Thank You.');
            this.setState({loading: false});
            this.props.history.push('/');
            
        }).catch(error => {
            this.setState({loading: false});
            console.log(error);
        });
         
    }
    inputChangedHandler = (event, inputIdentifier) => {
        console.log("event.target.value: ", event.target.value);

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        console.log('--', updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log('-- formIsValid :', formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    render() {
        const formElementsArray = [];
        console.log('*****: this.state.orderForm' , this.state.orderForm)
        for (let key in this.state.orderForm) {
            formElementsArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {
                         console.log('*****: formElementArray' , formElementsArray.length)
                    }
                    {                       
                       formElementsArray.map(formElement => (
                           <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig} 
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                touched={formElement.touched}
                                shouldValidate={formElement.config.validation}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                           />
                       ))      
                    }                 
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact Detail</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};
export default connect(mapStateToProps)(ContactData);