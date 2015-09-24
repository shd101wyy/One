let successFn = (res, callback)=> {
  if (res) {
    if (callback) callback(res)
    else callback(null)
  } else if (callback) {
    callback(null)
  }
}

let errorFn = (res, callback)=> {
  if (callback) callback(null)
}

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
  },

  // get user profile
  getProfile: function(userId, callback) {
    $.ajax('/get_profile', {
      type: 'POST',
      dataType: 'json',
      data: {userId},
      success: function(res) {
        successFn(res, callback)
      },
      error: function(res) {
        errorFn(res, callback)
      }
    })
  },

  // update user profile introduction
  updateProfileIntroduction: function(userId, intro, callback) {
    $.ajax('/update_profile_intro', {
      type: 'POST',
      dataType: 'json',
      data: {userId, intro},
      success: function(res) {
        successFn(res, callback)
      },
      error: function(res) {
        errorFn(res, callback)
      }
    })
  }

}


export default userAPI
