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
      {userLoggedIn ?
        <div className="icon-group">
          <div className="markdown-icon" onClick={this.showMarkdownEditor.bind(this)}> M </div>
        </div>
        : null}
    </div> )
  }

  inputMessage(e) {
    this.setState({message: e.target.value})
  }

  send(message=null) {
    message = message || this.state.message.trim()
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
            ats.push(arr[i].slice(1).toLowerCase())
          } else if (arr[i][0] === '#') {
            tags.push(arr[i].slice(1).toLowerCase())
          }
        }

        if (!tags.length) { // send private message
          if (ats.length) {
            console.log('private message: ', arr)
            socketAPI.sendPrivateMessage(ats, message)
          } else { // 既没有 tags, 也没有 ats

          }
        } else {
          if (ats.length) {

          } else { // 只有 tags, 没有 ats
            socketAPI.sendTopicMessage(tags, message)
          }
        }

        if (arr[0][0] === '@' || arr[0][0] === '#') {
          this.setState({message: arr[0] + ' '})
        }
      }
    }
  }

  checkKeyDown(e) {
    // console.log(e.keyCode)
    // # => 51
    if (e.keyCode === 13) { // press enter key
      this.send()
    }
  }

  changePlaceholder() {
    this.setState({placeholder: 'enter your message here.'})
  }

  showLoginPanel() {
    this.props.app.setState({showSigninPanel: true});
  }

  showMarkdownEditor() {
    this.props.app.setState({ showMarkdownEditor: true,
                              sendMarkdown: (markdown)=> {
                                console.log('send markdown', markdown)
                                this.send(markdown)
                              }})
  }
}
