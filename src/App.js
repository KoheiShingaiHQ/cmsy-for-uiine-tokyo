import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './container/Header.js';
import Footer from './container/Footer.js';
import Top from './container/Top.js';
import About from './container/About.js';
import Article from './container/Article.js';
import './Custom.css';

const path = { list : "/", featured : "/featured", detail : "/article" };

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Mauth"></Header>
        <Route exact path={path.list} component={About} />
        <Route exact path={path.featured} component={About} />
        <Route exact path={path.detail} component={Article} />
        <Route exact path={path.detail + "/:id"} component={Article} />
        <Footer></Footer>
      </div>
    )
  }
}

export default App;
