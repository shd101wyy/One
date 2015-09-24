if (!window.socket) {
  window.socket = io()
}

let socket = window.socket

let socketAPI = {
  userConnect: function(userId) {
    socket.emit('user-connect', userId)
    document.title = userId
  },

  // ats => ['raphael', 'christian']
  sendPrivateMessage: function(ats, message) {
    socket.emit('send-message', [], ats, message)

    socket.app.showMyMessage(message)
  },

  // tags => ['uiuc', 'fine']
  sendTopicMessage: function(tags, message) {
    socket.emit('send-message', tags, [], message)

    socket.app.showMyMessage(message)
  },

  sendTopicMessageWithAts: function(tags, ats, message) {
    socket.emit('send-message', tags, ats, message)
    socket.app.showMyMessage(message)
  }
}

socket.on('receive-message', function(data) {
  let message = data.message,
      fromId = data.fromId
  console.log('receive message', message, ' from ', fromId)
  socket.app.showMessage(message, fromId)
})

socket.on('update-my-topics', function(data) {
  let userData = data.userData
  socket.app.setState({userData})
})

export default socketAPI
