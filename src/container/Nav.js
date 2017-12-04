import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentPath } from '../container/Util.js';

const path = { list : "/", featured : "/featured", detail : "/article" };

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { menu : [] }
  }
  closeMenu(e) {
    e.preventDefault();
    var header = document.getElementsByTagName('header')[0];
    header.classList.remove('show-menu');
  }
  getObjectName(currentPath) {
    for (var i in path) {
      if (currentPath === path[i]) {
        return i;
      }
    }
  }
  componentDidMount() {
    var menu = [];
    var data = [
      {name: "article", path: path.detail, class: 'detail'},
      {name: "index", path: path.list, class: 'list'}
    ];
    for(var i in data){
      menu.push(<Link to={data[i].path} key={data[i].name}><li className={data[i].class}>{data[i].name}</li></Link>);
    }
    this.setState({ menu : menu });
  }
  render() {
    return (
      <nav>
        <ul data-selected={this.getObjectName("/" + getCurrentPath().split("/")[1]) || ""}>
          <li id="close-menu" onClick={this.closeMenu}>☓</li>
          {this.state.menu}
        </ul>
      </nav>
    );
  }
}

export default Nav;