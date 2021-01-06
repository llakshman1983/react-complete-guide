
// import logo from './logo.svg';
// import './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div >
       <Layout>
        <BurgerBuilder/>
         </Layout>     
    </div>
  );
}

export default App;
/* 
import React, { Component } from 'react';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Blog />
      </div>
    );
  }
}

export default App;
*/

