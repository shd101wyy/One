"use strict"

import React from 'react'
// import {Router, Route} from 'react-router'

import './less/entry.less'

import {Signin, Signup, NoMatch} from './components/login_signup.jsx'
import InputArea from './components/input_area.jsx'
import PostContent from './components/post_content.jsx'
import MarkdownEditor from './components/markdown_editor.jsx'

import userAPI from './api/user_api.js'
import profileApi from './api/profile_api.js'

import helpDoc from './examples/help.js'

window.global = {}
let profileDoc = `
### shd101wyy
`

/*
React.render(
  <Router>
    <Route path="/" component={Signin}>
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
, document.body)
*/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSigninPanel: false,
      userLoggedIn: false,
      showMarkdownEditor: true,
      posts: []
    }
  }

  componentDidMount() {
    userAPI.checkAuth((res)=> {
      if (res && res.success) {
        window.global.userId = res.userId
        this.setState({userLoggedIn: true})
      }
    })
  }

  render() {
    let posts = []
    for(var i = this.state.posts.length - 1; i >=0; i--) {
      posts.push(<PostContent postData={this.state.posts[i]}></PostContent>)
    }

    return (
    <div className="app container">
    {/*
      <div className="post-content">
        <div className="profile-pic">
          <img src="images/help.jpg"/>
        </div>
        <div className="other-post">
          <div className="other-post-content" dangerouslySetInnerHTML={{__html:marked(helpDoc)}}>
        </div>
        </div>
      </div>
      */}
      <div className="posts">
        {posts}
      </div>

      <InputArea app={this}> </InputArea>

      {this.state.showSigninPanel ? <Signin app={this} /> : null}

      {this.state.showMarkdownEditor ? <MarkdownEditor app={this} /> : null}
    </div>
    )
  }

  // add self profile
  showSelfProfile() {
    let posts = this.state.posts
    posts.push({
      me: true,
      image: window.global.userId + '.jpg',
      markdown: profileApi.generateProfileContent()
    })
    this.forceUpdate()
  }

  // show helps
  showHelps() {
    let posts = this.state.posts
    posts.push({
      me: false,
      image: 'help.jpg',
      markdown: helpDoc
    })
    this.forceUpdate()
  }
}

React.render(<App/>, document.body)
