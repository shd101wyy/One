import React from 'react'
let marked = require('marked')

export default class PostContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let me = this.props.me,
        profileImage = this.props.image,
        markdownString = this.props.markdown,
        htmlContent = this.props.htmlContent
    return (
      <div className="post-content">
        <div className={'profile-pic ' + (me ? 'me' : '')}>
          <img src={'images/' + profileImage}/>
        </div>
        <div className="other-post">
          <div className="other-post-content" dangerouslySetInnerHTML={{__html:marked(markdownString)}}>
        </div>
        </div>
      </div>
    )
  }
}

PostContent.propTypes = {
  me: React.PropTypes.bool,  // whether it is me that post this message,
  image: React.PropTypes.string,  // profile image of that user
  markdown: React.PropTypes.string,
  // htmlContent: React.PropTypes.html
}
