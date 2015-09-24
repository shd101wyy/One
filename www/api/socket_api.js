if (!window.socket) {
  window.socket = io()
}

let socket = window.socket

let socketAPI = {
  userConnect: function(userId) {
    socket.emit('user-connect', userId)
  },

  // ats => ['raphael', 'christian']
  sendPrivateMessage: function(ats, message, callback) {
    socket.emit('private-message', ats, message)

    socket.app.showMyMessage(message)
  }
}


socket.on('receive-message', function(data) {
  let message = data.message,
      fromId = data.fromId
  console.log('receive message: ', message, ' from ', fromId)

  socket.app.showMessage(message, fromId)
})

export default socketAPI
