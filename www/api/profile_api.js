let profileApi = {
  generateProfileContent: function() {
    let userId = window.global.userId
    return (
`
## ${userId}
---
Hello **${userId}**, this is your profile card.
`)
  }
}

export default profileApi
