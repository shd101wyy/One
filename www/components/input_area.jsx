import React from 'react'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userLoggedIn: false,
    }
  }

  render() {
    return (
    <div className="input-area">
      <input type="text" placeholder={ this.state.userLoggedIn ? "enter your message here." : ""} disabled={!this.state.userLoggedIn} />
      {this.state.userLoggedIn ?
        null:
        <span className="signin-hint"> you are not logged in yet. <a onClick={this.showLoginPanel.bind(this)}> click me </a> to sign in </span>}
    </div> )
  }

  showLoginPanel() {
    this.props.app.setState({showSigninPanel: true});
  }
}
