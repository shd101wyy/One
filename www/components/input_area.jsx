import React from 'react'

import userAPI from '../api/user_api.js'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  render() {
    let userLoggedIn = this.props.app.state.userLoggedIn
    return (
    <div className="input-area">
      <input type="text" placeholder={ userLoggedIn ? "enter your message here." : ""} disabled={!userLoggedIn} value={this.state.message} onChange={this.inputMessage.bind(this)}
      onKeyDown = {this.checkKeyDown.bind(this)} />
      {userLoggedIn ?
        null:
        <span className="signin-hint"> you are not logged in yet. <a onClick={this.showLoginPanel.bind(this)}> click me </a> to sign in </span>}
    </div> )
  }

  inputMessage(e) {
    this.setState({message: e.target.value})
  }

  checkKeyDown(e) {
    // console.log(e.keyCode)
    // # => 51
    if (e.keyCode === 13) { // press enter key
      let message = this.state.message.trim()
      this.setState({message: ''})

      if (message === '#help') {

      } else if (message === '#logout') {
        userAPI.logout((res)=> {
          if (res && res.success) {
            this.props.app.setState({userLoggedIn: false})
          } else {
            alert('failed to logout')
          }
        })
      }
    }
  }

  showLoginPanel() {
    this.props.app.setState({showSigninPanel: true});
  }
}
