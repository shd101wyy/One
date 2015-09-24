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
    socket.emit('private-message', ats, message)

    socket.app.showMyMessage(message)
  },

  // tags => ['uiuc', 'fine']
  sendTopicMessage: function(tags, message) {
    socket.emit('topic-message', tags, message)

    socket.app.showMyMessage(message, true)
  }
}


socket.on('receive-message', function(data) {
  let message = data.message,
      fromId = data.fromId
  console.log('receive message: ', message, ' from ', fromId)

  socket.app.showMessage(message, fromId)
})

socket.on('receive-topic-message', function(data) {
  let message = data.message,
      fromId = data.fromId
  console.log('receive topic message', message, ' from ', fromId)
  socket.app.showMessage(message, fromId)
})

export default socketAPI
