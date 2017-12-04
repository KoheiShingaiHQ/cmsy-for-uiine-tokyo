import React, { Component } from 'react';
var marked = require('marked');

class ContentGithub extends Component {
  constructor(props) {
    super(props);
    this.state = { link : "" }
  }
  setScrollStatus() {
    if (document.getElementById('about')) {
      var header = document.getElementsByTagName('header')[0];
      var main = document.getElementById('about');
      var footer = document.getElementsByTagName('footer')[0];
      var b = window.innerHeight;
      var h = header.scrollHeight;
      var m = main.scrollHeight;
      var f = footer.scrollHeight;
      var t = b - (h + m + f);
      footer.dataset.scroll = (t < 12) ? true : false;
    }
  }
  initGithub(props) {
    var url1;
    if (this.props.language === "en") {
      url1 = (props.revision) ? "https://rawgit.com/"+ props.user +"/"+ props.project +"/"+ props.revision +"/README.md" :
                                    "https://rawgit.com/"+ props.user +"/"+ props.project +"/master/"+ (props.file || "README") +".md";
    } else  {
      url1 = (props.revision) ? "https://rawgit.com/"+ props.user +"/"+ props.project +"/"+ props.revision +"/README.md" :
                                    "https://rawgit.com/"+ props.user +"/"+ props.project +"/master/"+ (props.file || "README") +".md";
    }
    this.setState({ link : (props.revision) ? 
      "https://github.com/"+ props.user +"/"+ props.project +"/"+ props.revision :
      "https://github.com/"+ props.user +"/"+ props.project
    });
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', url1);
    var self = this;
    xhr1.onload = function loaded1(){
      var githubSection = document.getElementById("section-" + props.id);
      var renderer = new marked.Renderer();
      renderer.code = function(code, language) {
        return '<pre><code class="hljs">' + window.hljs.highlightAuto(code).value + '</code></pre>';
      };
      marked.setOptions({
        renderer: renderer,
      });
      var response = marked(this.response).split('<a').join('<a target="_blank"');
      if (githubSection) {
        githubSection.innerHTML = response;
      }
      self.setScrollStatus();
    };
    xhr1.send();
    for (var i of (props.related || [])) {
      var url2, title2;
      if (this.props.language === "en") {
        url2 = (props.revision) ? "https://rawgit.com/"+ props.user +"/"+ props.project +"/master/"+ props.revision +"/readme/"+ i.split(":::")[0] +".md" :
                                      "https://rawgit.com/"+ props.user +"/"+ props.project +"/master/readme/"+ i.split(":::")[0] +".md";
        title2 = i.split(":::")[0];
      } else  {
        url2 = (props.revision) ? "https://rawgit.com/"+ props.user +"/"+ props.project +"/master/"+ props.revision +"/readme/"+ i.split(":::")[0] +"."+ props.language +".md" :
                                      "https://rawgit.com/"+ props.user +"/"+ props.project +"/master/readme/"+ i.split(":::")[0] +"."+ props.language +".md";
        title2 = i.split(":::")[0];
      }    
      var xhr2 = new XMLHttpRequest();
      xhr2.open('GET', url2);
      xhr2.onload = function loaded2(i){
        var githubRelated = document.getElementById("related-" + props.id);
        var section = document.createElement("section");
        var h3 = document.createElement("h3");
        h3.classList.add("switch");
        section.classList.add("child");
        var renderer = new marked.Renderer();
        renderer.code = function(code, language) {
          return '<pre><code class="hljs">' + window.hljs.highlightAuto(code).value + '</code></pre>';
        };
        marked.setOptions({
          renderer: renderer,
        });
        var response = marked(this.response).split('<a').join('<a target="_blank"');
        section.innerHTML = response;
        h3.innerText = (title2 || "Related contents");
        h3.addEventListener('click', function(){
          this.parentElement.classList.toggle('show');
        });
        if (githubRelated) {
          githubRelated.appendChild(section);
          githubRelated.insertBefore(h3, section);
        }
      }
      xhr2.send();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.id) {
      this.initGithub(nextProps);
    }
  }
  componentDidMount() {
    this.initGithub(this.props);
    var self = this;
    window.addEventListener('resize', function (event) {
      self.setScrollStatus();
    });
  }
  render() {
    return (
      <section className={"content-github " + this.props.language}>
          <a href="#/">
            <h3 className="en ja repository" style={{width:"28px",marginTop:"19px",display:"block",opacity:".88"}}>
              <svg x="0px" y="0px" viewBox="0 0 512.001 512.001" fill="#3897f0">
                <g>
                  <g>
                    <path d="M384.834,180.699c-0.698,0-348.733,0-348.733,0l73.326-82.187c4.755-5.33,4.289-13.505-1.041-18.26
                      c-5.328-4.754-13.505-4.29-18.26,1.041l-82.582,92.56c-10.059,11.278-10.058,28.282,0.001,39.557l82.582,92.561
                      c2.556,2.865,6.097,4.323,9.654,4.323c3.064,0,6.139-1.083,8.606-3.282c5.33-4.755,5.795-12.93,1.041-18.26l-73.326-82.188
                      c0,0,348.034,0,348.733,0c55.858,0,101.3,45.444,101.3,101.3s-45.443,101.3-101.3,101.3h-61.58
                      c-7.143,0-12.933,5.791-12.933,12.933c0,7.142,5.79,12.933,12.933,12.933h61.58c70.12,0,127.166-57.046,127.166-127.166
                      C512,237.745,454.954,180.699,384.834,180.699z"/>
                  </g>
                </g>
              </svg>
            </h3>
          </a> 
        <section id={"section-" + this.props.id}></section>
        { (this.props.capture) ?
          <iframe title={this.props.capture} src={"https://asciinema.org/a/"+ this.props.capture +"/embed?"} id={"asciicast-iframe-" + this.props.capture} name={"asciicast-iframe-" + this.props.capture} scrolling="no" allowFullScreen="true"></iframe> :
          "" }
        <section id={"related-" + this.props.id} className="related"></section>
      </section>
    );
  }
}

export default ContentGithub;