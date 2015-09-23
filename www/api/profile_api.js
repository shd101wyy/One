let profileApi = {
  generateProfileContent: function() {
    let userId = window.global.userId
    return (
`
## ${userId} (<code>#me</code>)
---
* Hello **${userId}**, this is your profile card.
* You can click the **pencil icon** on the right side below your profile picture to edit this profile card.
`)
  }
}

export default profileApi
