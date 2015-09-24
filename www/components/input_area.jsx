import React from 'react'

import userAPI from '../api/user_api.js'
import socketAPI from '../api/socket_api.js'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      placeholder: 'type #help to get helps'
    }
  }

  render() {
    let userLoggedIn = this.props.app.state.userLoggedIn
    return (
    <div className="input-area">
      <input type="text" placeholder={ userLoggedIn ? this.state.placeholder : ""} disabled={!userLoggedIn} value={userLoggedIn ? this.state.message : ''} onChange={this.inputMessage.bind(this)}
      onKeyDown = {this.checkKeyDown.bind(this)}
      onClick={this.changePlaceholder.bind(this)} />
      {userLoggedIn ?
        <span className="signin-hint"></span>:
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
      this.setState({message: '', placeholder: 'enter your message here.'})

      if (message === '#help') {
        this.props.app.showHelps()

      } else if (message === '#logout') {
        userAPI.logout((res)=> {
          if (res && res.success) {
            this.props.app.setState({userLoggedIn: false})
          } else {
            alert('failed to logout')
          }
        })
      } else if (message === '#me') {
        this.props.app.showSelfProfile()
      } else {
        let arr = message.split(' ')
        if (arr.length === 1 && arr[0][0] === '@') { // @raphael,  search for user
          let userId = arr[0].slice(1)
          if (userId === window.global.userId) {
            this.props.app.showSelfProfile()
          } else {
            this.props.app.showOtherProfile(arr[0].slice(1))
          }
        } else {
          let tags = []
          let ats = []
          for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === '@') {
              ats.push(arr[i].slice(1))
            } else if (arr[i][0] === '#') {
              ats.push(arr[i].slice(1))
            }
          }

          if (!tags.length && ats.length) { // send private message
            console.log('private message: ', arr)
            socketAPI.sendPrivateMessage(ats, message, (res)=> {
              if (res && res.success) {
                console.log('message sent')
              } else {
                console.log('failed to deliver message')
              }
            })
          }
        }
      }
    }
  }

  changePlaceholder() {
    this.setState({placeholder: 'enter your message here.'})
  }

  showLoginPanel() {
    this.props.app.setState({showSigninPanel: true});
  }
}
