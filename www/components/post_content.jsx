import React from 'react'
let marked = require('marked')

export default class PostContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: 'images/' + this.props.postData.image
    }
  }

  componentDidMount() {
    let img = new Image()
    img.onerror = ()=> {
      console.log('ERROR')

      // use identicon to generate unique icons for profile img
      let data = new Identicon(window.global.userId, 64).toString()
      this.setState({imageSrc: 'data:image/png;base64,' + data})
    }
    img.src = this.state.imageSrc
    console.log('ENTER HERE', this.props.postData)
  }

  render() {
    let postData = this.props.postData,
        me = postData.me,
        markdownString = postData.markdown,
        htmlContent = postData.htmlContent
    return (
      <div className="post-content">
        <div className={'profile-pic ' + (me ? 'me' : '')}>
          <img src={this.state.imageSrc}/>
          {me ?
            <i className="fa fa-pencil-square-o" onClick={this.editPostContent.bind(this)}></i>
          : null}
        </div>
        <div className="other-post">
          <div className="other-post-content" dangerouslySetInnerHTML={{__html:marked(markdownString)}}>
        </div>
        </div>
      </div>
    )
  }

  editPostContent() {
    alert('Edit is not implemented yet')
  }
}

PostContent.propTypes = {
  //me: React.PropTypes.bool,  // whether it is me that post this message,
  //image: React.PropTypes.string,  // profile image of that user
  //markdown: React.PropTypes.string,
  // htmlContent: React.PropTypes.html
  postData: React.PropTypes.object
}
