import React, {Component} from 'react';

import Aux from '../Auxilary/Auxilary';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/* 
const layout = (props) => (
    <Aux>    
        <Toolbar/>
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
); 
*/

class Layout extends Component {
    state = {
        showSideDrawer:true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
       // this.setState({showSideDrawer: !this.state.showSideDrawer});

       // Clear way to set state, if we depend on previous state
       this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
       });
           
    }
    render () {
        return (
            <Aux>    
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
}
export default Layout;