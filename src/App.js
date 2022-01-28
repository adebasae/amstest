import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
// import logo from './logo.svg';

import './App.css';
import Card from './components/Card';

import './assets/scss/globals.scss';

function App() {
  const routes = (
    <Router>
      <Layout>
        <Switch>
          {/* detalles */}

          <Route path="/detalles" component={<div>detalles</div>} />

          {/* defautl */}

          <Route path="/" exact component={Card} />
        </Switch>
      </Layout>
    </Router>
  );
  return <div>{routes}</div>;
}

export default App;
