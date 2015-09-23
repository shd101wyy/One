let userAPI = {
  checkAuth: function(callback) {
    $.ajax('/auth', {
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('auth success', res)
        if (res) {
          if (callback) callback(res)
          else callback(null)
        } else if (callback) {
          callback(null)
        }
      },
      error: function(res) {
        if (callback) callback(null)
      }
    })
  },

  signin: function(email, password, callback) {
    $.ajax('/signin', {
      type: 'POST',
      dataType: 'json',
      data: {email, password},
      success: function(res) {
        if (res) {
          if (callback) callback(res)
          else callback(null)
        } else if (callback) {
          callback(null)
        }
      },
      error: function(res) {
        if (callback) callback(null)
      }
    })
  },

  signup: function(email, password, userId, callback) {
    $.ajax('/signup', {
      type: 'POST',
      dataType: 'json',
      data: {email, password, userId},
      success: function(res) {
        if (res) {
          if (callback) callback(res)
          else callback(null)
        } else if (callback) {
          callback(null)
        }
      },
      error: function(res) {
        if (callback) callback(null)
      }
    })
  },

  logout: function(callback) {
    $.ajax('/logout', {
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        if (res) {
          if (callback) callback(res)
          else callback(null)
        } else if (callback) {
          callback(null)
        }
      },
      error: function(res) {
        if (callback) callback(null)
      }
    })
  }
}


export default userAPI
