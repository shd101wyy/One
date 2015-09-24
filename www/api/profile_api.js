let profileAPI = {
  generateProfileContent: function() {
    let userId = window.global.userId
    return (
`
## ${userId} (<code>#me</code>)
---
* Hello **${userId}**, this is your profile card.
* You can click the **pencil icon** on the right side below your profile picture to edit this profile card.
`)
  },

  generateOthersProfileContent: function(userId) {
    return(
`
## ${userId}
---
${userId} doesn't have his profile card set up yet, @ him to message him.  
<code>@${userId} please set up your profile card by typing \'#me\'</code>
`
    )
  }
}

export default profileAPI
