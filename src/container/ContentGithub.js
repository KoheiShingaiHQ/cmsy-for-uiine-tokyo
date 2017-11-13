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
        { (!this.props.post) ? 
          <a target="_blank" href={this.state.link}>
            <h3 className="en repository">See Repository</h3>
            <h3 className="ja repository">リポジトリを見る</h3>
          </a> :
          <a target="_blank" href={this.props.post}>
            <h3 className="en repository">See on Instagram</h3>
            <h3 className="ja repository">Instagramで見る</h3>
          </a>
        }
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