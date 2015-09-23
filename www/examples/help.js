let helpDoc = `
### This is the introduction of this website
#### This website is still under development, for more information, have a look at  [github](https://github.com/shd101wyy/One).
---
  * Here are some very basic instructions.
    * <code> #help </code> - to get helps(the page you are reading now)
    * <code> #logout </code> - to logout your account

### How to use this website
---
This website is designed as a social app based on topics.
Every message you post will have a topic.
And here are several public topics you can use as a try.
  * to search a topic, simply type <code>#</code> and topic name, for example
    * <code>#help</code> will get all posts related to <code>#help</code> topic.
    * <code>#all</code> will get all posts on this website ordered by post time.
  * if you want to post a message to <code>#all</code> topic, simplely include <code>#all</code> in your message.
    * for example <code>#all Today's weather is super good</code> will post this message to <code>#all</code> topic.
    * for example <code>I like playing #dota2, anyone else wants to play with me tonight </code> will post this message to <code>#dota2</code> topic.
  * if you didn't include any <code>#</code> topic, what you post will be sent to <code>#your-id</code> topic.
  * 未来考虑加上类似 微信 的群组功能。

You can also tag friends in your message.
  * to search a friend, simply type <code>@your-friend-id</code>, for exmaple
    * <code>@raphael</code> will search for user with id <code>raphael</code> and you can choose to follow him.
  * to tag a friend, simply type <code>@your-friend-id</code>, for example
    * <code>@raphael you are so handsome</code> will send this message to <code>@raphael</code> and raphael will receive this message in his main page at real time.
  * of course you can also tag multiple friends.
  * if you tag friends without including the <code>#</code> topic, then your conversation will be private and not shown to public.

### Who made this
---
This website is initially designed and programmed by **Yiyi Wang** (shd101wyy) from University of Illinois at Urbana Champaign. He made this website right before the midterm as he was feeling extremely unhappy and he didn't want to do anything else except coding.
So he locked his door and began to make this website on September 22nd 2015 at 5:12 pm
`

export default helpDoc
