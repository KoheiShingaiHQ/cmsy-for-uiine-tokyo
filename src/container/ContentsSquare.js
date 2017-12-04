import React, { Component } from 'react';
import ContentLabel from '../container/ContentLabel.js';

class ContentsSquare extends Component {
  constructor(props) {
    super(props);
    this.state = { contents : [], language : "" }
  }
  componentDidMount() {
    var contents = [];
    var data = this.props.data;
    data.sort(function(a,b){
      if(a.order < b.order) return -1;
      if(a.order > b.order) return 1;
      return 0;
    });
    for(var i in data){
      var hrefWiki, href;
      var targetInsta, target;
      var display = "block";
      if (data[i].wiki) {
        hrefWiki = "https://en.wikipedia.org/wiki/" + data[i].wiki;
        href = (data[i].href.indexOf("/") !== -1) ? "#/article" + data[i].href : "#/";
      } else {
        hrefWiki = "";
        display = "none";
        href = (data[i].href.indexOf("/") !== -1) ? "#/article" + data[i].href : "#/";
      }
      if (data[i].category) {
        var categories = data[i].category.split("_").join(" : ");
        document.getElementById("main-title").innerText = "Mauth : " + categories;
      }
      contents.push(
        <li key={data[i].image}>
          <a href={hrefWiki} target="_blank" style={{display:display}}>
            <svg style={{position:"absolute",zIndex:2,marginTop:"5px",marginLeft:"5px",opacity:.6,fill:(data[i].color) ? data[i].color : "#262626"}} aria-hidden="true" width="32px" height="32px" viewBox="0 0 485 485" x="0px" y="0px" viewBox="0 0 458.723 458.723">
              <path d="M455.724,93.489H367.32h-3v3v9.613v3h3h6.143c7.145,0,13.588,3.667,17.237,9.81
                c3.648,6.143,3.786,13.555,0.368,19.829l-98.3,180.432l-44.769-106.727l42.169-77.382c8.727-16.014,25.477-25.962,43.714-25.962
                h1.992h3v-3v-9.613v-3h-3H247.47h-3v3v9.613v3h3h6.143c7.145,0,13.588,3.667,17.237,9.81c3.648,6.143,3.786,13.555,0.368,19.829
                l-30.587,56.143L213.372,129.9c-1.976-4.71-1.487-9.852,1.341-14.105s7.38-6.693,12.488-6.693h6.988h3v-3v-9.613v-3h-3H128.46h-3v3
                v9.613v3h3h1.454c20.857,0,39.546,12.428,47.615,31.661l40.277,96.018l-44.887,82.392L93.523,129.9
                c-1.976-4.71-1.487-9.852,1.341-14.105s7.38-6.693,12.488-6.693h10.737h3v-3v-9.613v-3h-3H3H0v3v9.613v3h3h7.064
                c20.857,0,39.547,12.428,47.615,31.661l91.526,218.191c1.601,3.816,5.313,6.282,9.458,6.282c3.804,0,7.163-1.998,8.986-5.344
                l11.939-21.91l45.582-83.646l43.884,104.617c1.601,3.816,5.313,6.282,9.458,6.282c3.804,0,7.163-1.998,8.986-5.344l11.939-21.91
                l110.58-202.919c8.727-16.014,25.477-25.962,43.714-25.962h1.992h3v-3v-9.613v-3h-2.999L455.724,93.489L455.724,93.489z"/>
            </svg>
          </a>
          <a href={href}>
            <div style={{backgroundImage:"url("+ data[i].image +")", backgroundSize:data[i].size}}>
              <ContentLabel main={data[i].order + " " + data[i].main} sub={data[i].sub}></ContentLabel>
            </div>
          </a>
        </li>
      );
    }
    this.setState({ contents : contents });
  }
  render() {
    return ( <ul>{this.state.contents}</ul> );
  }
}

export default ContentsSquare;