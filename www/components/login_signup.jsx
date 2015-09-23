import React from 'react'
import {Link} from 'react-router'

export class Signin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      signin: true
    }
  }

  componentDidMount() {
    console.log('Done')
  }

  render() {
    let signin = this.state.signin

    return (
      <div className="signin">
        <div className="signin-panel">
          <form>
            <h2 className="form-heading">{signin ? 'Please sign in' : 'Please sign up'}</h2>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" />

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
            {/*
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            */}
          <button className="btn btn-lg btn-primary btn-block" type="submit">{signin ? 'Sign in' : 'Sign up'}</button>
          </form>
          <a className="switch-panel-btn" onClick={this.toggleSignin.bind(this)}> {signin ? '没有账号? 点击我进行注册' : '已经有账号了? 点击我进行登入'} </a>
          <a className="close-panel-btn" onClick={this.closePanel.bind(this)}> 关闭 </a>
        </div>
      </div>
    )
  }

  toggleSignin() {
    this.setState({signin: !this.state.signin})
  }

  closePanel() {
    this.props.app.setState({showSigninPanel: false})
  }
}
