import React from 'react'
var marked = require('marked')

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    this.markdownEditor = CodeMirror.fromTextArea(
      document.getElementById('markdown-editor'),
      {
        lineNumbers: true,
        mode: 'markdown',
      })
    this.markdownEditor.setValue(this.props.app.state.markdownDefaultValue)
    this.setState({content: this.props.app.state.markdownDefaultValue})

    this.markdownEditor.on('change', ()=> {
      this.setState({content: this.markdownEditor.getValue()})
    })
  }

  render() {
    return (
    <div className="markdown-editor">
      <div className="panel">

        <textarea className="editor" id="markdown-editor">
        </textarea>

        <div className="preview" dangerouslySetInnerHTML={{__html: marked('\n'+this.state.content)}}>
        </div>
        <button className="btn cancel-btn" onClick={this.closePanel.bind(this)}> close </button>

        <button className="btn send-btn" onClick={this.send.bind(this)}> send </button>
      </div>
    </div>
    )
  }

  send() {
    this.props.app.state.sendMarkdown(this.markdownEditor.getValue())
    this.props.app.setState({showMarkdownEditor: false})
  }

  closePanel() {
    this.props.app.setState({showMarkdownEditor: false})
  }
}
