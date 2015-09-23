import React from 'react'
import {Link} from 'react-router'

import userAPI from '../api/user_api.js'

export class Signin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      signin: true,
      email: '',
      password: '',
      userId: ''
    }
  }

  componentDidMount() {
    console.log('Done')
  }

  render() {
    let signin = this.state.signin

    return (
      <div className={"signin " + (signin? '' : 'taller')} >
        <div className="signin-panel">
          <form>
            <h2 className="form-heading">{signin ? 'Please sign in' : 'Please sign up'}</h2>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" onChange={this.inputEmail.bind(this)} />

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" onChange={this.inputPassword.bind(this)}/>
            {/*
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            */}
            { signin ? null : <label htmlFor="inputUserId" className="sr-only">Email  address</label> }
            { signin ? null : <input type="email" id="inputUserId" className="form-control" placeholder="User Id (Unique one)" required="" autofocus="" onChange={this.inputUserId.bind(this)} />
            }

          <button className="btn btn-lg btn-primary btn-block" onClick={signin ? this.signin.bind(this) : this.signup.bind(this)}>{signin ? 'Sign in' : 'Sign up'}</button>
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

  inputEmail(e) {
    this.setState({email: e.target.value})
  }

  inputPassword(e) {
    this.setState({password: e.target.value})
  }

  inputUserId(e) {
    this.setState({userId: e.target.value})
  }

  signin(e) {
    e.preventDefault()
    let email = this.state.email,
        password = this.state.password
    userAPI.signin(email, password, (res)=>{
      if (res && res.success) {
        this.props.app.setState({showSigninPanel: false, userLoggedIn: true})
      } else {
        alert('failed to sign in')
      }
    })
  }

  signup(e) {
    e.preventDefault()
    let email = this.state.email,
        password = this.state.password,
        userId = this.state.userId
    userAPI.signup(email, password, userId, (res)=>{
      if (res && res.success) {
        this.props.app.setState({showSigninPanel: false, userLoggedIn: true})
      } else {
        alert('failed to sign up')
      }
    })
  }
}
