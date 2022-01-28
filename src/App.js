import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
// import logo from './logo.svg';

import './App.css';
import Test from './components/Test';

import './assets/scss/globals.scss';

function App() {
  const routes = (
    <Router>
      <Layout>
        <Switch>
          {/* detalles */}

          <Route path="/detalles" component={<div>detalles</div>} />

          {/* defautl */}

          <Route path="/" exact component={Test} />
        </Switch>
      </Layout>
    </Router>
  );
  return <div>{routes}</div>;
}

export default App;
