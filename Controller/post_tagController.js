/* eslint-disable no-unused-vars */
const { db } = require('../Models/index')
const message = require('../messages/index')

// const User = db.user
const Post_tag = db.post_tag

const addPost_tag = async (req, res) => {
  try {
    const post_tag = await Post_tag.create({
      postId: req.body.postId,
      tagId: req.body.tagId,
      // sPassword: req.sHashedPass,
    })
    console.log(post_tag.getDataValue('id'))
    console.log(post_tag)

    return res.status(message.status.statusSuccess).json(post_tag)
  } catch (error) {
    console.log('Error in adding new post', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

module.exports = { addPost_tag }
