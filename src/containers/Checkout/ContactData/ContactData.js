import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log("Contact Data: orderHandler  " +  this.props.ingredients);
        this.setState({loading: true});       
        const burgerOrder = {
            ingredients: this.state.ingredients,
            // Recalculate at server side
            // price: this.state.totalPrice,
            price: this.props.price,
            customer: {
                name: 'I J',
                address: {
                    street: '111 W SIDE Dr',
                    zip: '10020',
                    country: 'USA'
                },
                email: 'IJ@gmail.com',
            },
            delivery: 'Pickup'                
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

    render() {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>

                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;