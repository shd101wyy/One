let userAPI = {
  checkAuth: function(callback) {
    $.ajax('/auth', {
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('auth success', res)
        if (res) {
          if (res) callback(res)
          else callback(null)
        }
      },
      error: function(res) {
        console.log('auth error', res)
        if (callback) callback(null)
      }
    })
  },

  login: function() {

  },

  logout: function() {

  }
}


export default userAPI
