import React from 'react'

export default class HotTopics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hotTopics: []
    }
  }

  componentDidMount() {
    let getHotTopics = ()=> {
      $.ajax('/get-hot-topics', {
        type: 'GET',
        dataType: 'json',
        success: (res)=> {
          if (res && res.success) {
            // console.log(res.data)
            this.setState({hotTopics: res.data})
          }
        },
        error: (res)=> {
          // do nothing
        }
      })
    }

    getHotTopics()
    // setInterval(getHotTopics, 1000 * 60) // update every 1 minute
    setInterval(getHotTopics, 1000 * 5) // update every 5 s for test use
  }

  render() {
    let hotTopics = this.state.hotTopics,
        topicsList = []
    if (hotTopics.length) {
      topicsList = hotTopics.map((data, index)=> {
        let topic = data[0],
            hits = data[1]
        return (
          <li className="list-group-item" key={index}>
             <span className={'badge ' + (index === 0 ? 'number1' : (index === 1 ? 'number2':'') )}>{hits + ' hits'}</span>
              {(index+1) + '. ' + topic}
           </li>
        )
      })
    }
    return (
      <div className="hot-topics">
        <div className="heading"> hot topics </div>
        <ul className="list-group">
          {topicsList.length ?
            topicsList
            : <div> 正在努力从服务器搬运 <code>hot topics</code> </div>
          }
        </ul>
      </div>
    )
  }
}
