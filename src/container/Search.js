import React, { Component } from 'react';
import { firebaseDb } from '../firebase/';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sugest : [],
      result : [],
      results : [],
      related : [],
      input : ""
    }
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }
  componentDidMount() {
    localStorage.language = localStorage.language || 'english';
    var langStorage = localStorage.language.substring(0, 2);
    var searchResult = document.getElementById('search-result');
    searchResult.classList.add(langStorage);
    var sugest = [];
    var self = this;
    firebaseDb.ref("/search").once('value').then(function(snapshot) {
      const val = snapshot.val();
      for (var i in val) {
        sugest.push(i);
        self.setState({ sugest : sugest })
      }
    });
  }
  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      var word = document.getElementById("search-input").value;
      window.open('https://en.wikipedia.org/wiki/' + word, '_blank');
    }
  }
  render() {
    return (
      <section className="search">
        <svg width="24px" height="24px" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        <input id="search-input" type="search" placeholder="Search" onKeyPress={this._handleKeyPress} />
        <section id="search-result">
          <p className="en">{"Keyword : " + this.state.input}</p>
          <p className="ja">{"キーワード : " + this.state.input}</p>
          <p className="en">{"Sugested : " + Array.from(new Set(this.state.related)).join(", ")}</p>
          <p className="ja">{"候補 : " + Array.from(new Set(this.state.related)).join(", ")}</p>
          <p className="en">{"Result : " + this.state.result.length + " results"}</p>
          <p className="ja">{"結果 : " + this.state.result.length + " 件"}</p>
          <section id="result-output">{this.state.results}</section>
        </section>
      </section>
    );
  }
}

export default Nav;