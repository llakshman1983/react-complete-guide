import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from  '../Auxilary/Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.requestInterceptor =  axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        componentWillUnmount() {
            console.log('Will Unmount : ', this.requestInterceptor, this.responseInterceptor);
            // To prevent memory leaks
            //axios.interceptors.request.reject(this.requestInterceptor);
            // axios.interceptors.request.reject(this.responseInterceptor);
        }
        errorConfirmedHander = () => {
            this.setState({error: null});
        }
        render() {
            return (
                <Aux>
                    <Modal 
                        modalClosed={this.errorConfirmedHander}
                        show={this.state.error}>
                        Error: Something went wrong
                        {this.state.error? this.state.error.message: null}
                    </Modal>           
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;