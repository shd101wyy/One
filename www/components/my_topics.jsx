import React from 'react'

import userAPI from '../api/user_api.js'

class TopicItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="list-group-item">
         <span className="badge"
               onClick={this.deleteTopic.bind(this)}>x</span>
          {this.props.topic}
       </li>
    )
  }

  deleteTopic() {
    userAPI.deleteTopic(window.global.userId, this.props.topic, (res)=>{
      if (res && res.success) {
        this.props.app.setState({userData: res.data})
      }
    })
  }
}

export default class MyTopics extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    let topics = this.props.app.state.userData.topics
    let topicsList = []
    
    if (topics) {
      for(let i = topics.length - 1; i >= 0; i--) {
        topicsList.push(<TopicItem key={i} app={this.props.app} topic={topics[i]}> </TopicItem>)
      }
    }
    return (
      <div className="my-topics">
        <div className="heading"> my topics </div>
        <ul className="list-group">
          {topics? topicsList : null}
        </ul>
      </div>
    )
  }

  deleteTopic(e) {
    console.log('deleteTopic', e)
  }
}
