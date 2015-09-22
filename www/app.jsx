import React from 'react'

import './less/entry.less'

import userAPI from './api/user_api.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authSuccess: false
    }
  }

  componentDidMount() {
    console.log('component mount')
    userAPI.checkAuth((res)=> {
      if (res) {
        this.setState({authSuccess: true})
      }
    })
  }

  render() {
    return <div className="app">
            This is app
           </div>
  }
}

React.render(<App/>, document.body)
