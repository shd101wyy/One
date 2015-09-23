"use strict"

import React from 'react'
// import {Router, Route} from 'react-router'

import './less/entry.less'

import userAPI from './api/user_api.js'

import {Signin, Signup, NoMatch} from './components/login_signup.jsx'
import InputArea from './components/input_area.jsx'
import PostContent from './components/post_content.jsx'

import helpDoc from './examples/help.js'

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
      userLoggedIn: false
    }
  }

  componentDidMount() {
    userAPI.checkAuth((res)=> {
      if (res && res.success) {
        this.setState({userLoggedIn: true})
      }
    })
  }

  render() {
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
        <PostContent me={false} image="help.jpg" markdown={helpDoc}></PostContent>
        <PostContent me={false} image="help.jpg" markdown={helpDoc}></PostContent>
      </div>
      <InputArea app={this}> </InputArea>
      {this.state.showSigninPanel ? <Signin app={this}/> : null}
    </div>
    )
  }
}

React.render(<App/>, document.body)
