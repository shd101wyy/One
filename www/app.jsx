"use strict"

import React from 'react'
// import {Router, Route} from 'react-router'

import './less/entry.less'

import {Signin, Signup, NoMatch} from './components/login_signup.jsx'
import InputArea from './components/input_area.jsx'
import PostContent from './components/post_content.jsx'
import MarkdownEditor from './components/markdown_editor.jsx'

import userAPI from './api/user_api.js'
import profileAPI from './api/profile_api.js'
import socketAPI from './api/socket_api.js'

import helpDoc from './examples/help.js'

window.global = {}

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
      showMarkdownEditor: false,
      posts: [],
      markdownDefaultValue: '',
      userData: {}
    }

    if (window.socket) {
      window.socket.app = this
    }
  }

  componentDidMount() {
    userAPI.checkAuth((res)=> {
      if (res && res.success) {
        window.global.userId = res.userId
        socketAPI.userConnect(res.userId) // connect to socket
        this.setState({userLoggedIn: true})

        // get user data
        userAPI.getProfile(window.global.userId, (res)=> {
          if (res && res.success) {
            this.setState({userData: res.data})
          }
        })
      }
    })
  }

  render() {
    let posts = []
    // for(let i = this.state.posts.length - 1; i >=0; i--) {
    for(let i = 0; i < this.state.posts.length; i++) {
      posts.push(<PostContent app={this} postData={this.state.posts[i]} key={i}></PostContent>)
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

      {this.state.userLoggedIn ? <div className="friend-list"> </div> : null}

      {this.state.userLoggedIn ? <div className="hot-topics"> </div> : null}

      {this.state.userLoggedIn ? <div className="my-topics"> </div> : null}
    </div>
    )
  }

  // add self profile
  showSelfProfile() {
    let posts = this.state.posts

    // get user profile
    if (window.global.userId) {
      userAPI.getProfile(window.global.userId, (res)=> {
        if (res && res.success) {
          // TODO: dont sent out user password
          console.log('check profile: ', res.data)
          let user = res.data,
              postData = {
                            me: true,
                            image: window.global.userId + '.jpg',
                            markdown: (user.intro ? user.intro : profileAPI.generateProfileContent()),
                            topic: '#me'
                          }
          posts.push(postData)
          this.forceUpdate()
        } else {
          alert('failed to retrieve user profile: ' + window.global.userId)
        }
      })
    }
  }

  // show other people's profile
  showOtherProfile(userId) {
    let posts = this.state.posts
    if (userId) {
      userAPI.getProfile(userId, (res)=> {
        if (res && res.success) {
          let user = res.data,
              postData = {
                me: false,
                image: userId + '.jpg',
                markdown: (user.intro ? user.intro : profileAPI.generateOthersProfileContent(userId)),
                topic: '@'+userId
              }
          posts.push(postData)
          this.forceUpdate()
        } else {
          alert('failed to retrieve user profile: ' + userId)
        }
      })
    }
  }

  // show helps
  showHelps() {
    let posts = this.state.posts
    posts.push({
      me: false,
      image: 'help.jpg',
      markdown: helpDoc,
      topic: 'help'
    })
    this.forceUpdate()
  }

  // show message
  showMessage(message, fromId) {
    let posts = this.state.posts
    posts.push({
      me: false,
      image: fromId + '.jpg',
      markdown: message
    })
    this.forceUpdate()
  }

  // show message i sent
  showMyMessage(message) {
    let posts = this.state.posts
    posts.push({
      me: true,
      image: window.global.userId + '.jpg',
      markdown: message,
      hideEditButton: true
    })
    this.forceUpdate()
  }
}

React.render(<App/>, document.body)
