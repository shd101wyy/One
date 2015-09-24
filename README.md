# One(temp) (Topit) is a topic based social applicaation
---
#### I (*Yiyi*) wrote this application when I felt extremely unhappy on September 22nd 2015.

* How to enter post a **topic message**  
  * eg:
  ```
    #uiuc 是一个很好的学校
  ```
    然后这个关注这个 topic 的人就会收到这条信息， 或者曾经在这个 topic 里面说过话的人都将收到这条信息。

* 默认状态下，会关注 #1 这个 topic, 这个 topic 类似于一个全局 topic。
  * eg:
  ```
    #all 我很帅
    #friends 我很帅
  ```
  将会发送给所有用户这条信息。

* 没有加 #topic 的话，默认为发给自己。

* 当然你也可以 follow 你的朋友，然后可以看到你的朋友发送的信息。 他发送的信息的 topic 会自动显示在网页上。

* 输入 # 后带有自动补全，主要会显示你自己用过的 topic 和朋友的 topic。  

* 可以加上热门 topic 这个功能在未来。

* 可以同时带上多个 topic

* 一些指令, 如果只输入了 "#help" 等这些后面没有接内容，则是进行搜索。

* 一些特别的指令 例如 #nearby
---
##### Next @ 功能

* Chat with your friend by enter **@** so that your friend will also receive this message

* 当初创建了一个新的原来不存在的 topic 的时候， 系统提示用户创建了新的 topic  

* 经验值机制。 根据用户发送的 message 来提升经验值，以及等级。

* 连环搜索。 ```#dota2 #ig```

* 用户创建新的不存在的 topic 的时候， ask them.
---
##### Test
```
npm install
bower install
sudo mongod
npm test
```
---
I might make it a startup.
