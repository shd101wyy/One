if (!window.socket) {
  window.socket = io()
}

let socket = window.socket

let socketAPI = {
  userConnect: function(userId) {
    socket.emit('user-connect', userId)
  }
}

export default socketAPI
