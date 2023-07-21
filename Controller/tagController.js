/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {db} = require('../model/index')
const message = require('../messages/index')

const Tag = db.tag
const Post = db.post

const addTag = async (req, res) => {
  try {
    const tag = await Tag.create({
      sTag: req.body.sTag ,

    })
    console.log(tag.getDataValue('id'))
    console.log(tag)

    return res.status(message.status.statusSuccess).json(tag)
  } catch (error) {
    console.log('Error in adding new tag', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

const getTag = async (req, res) => {
  try {
    const tag = await Tag.findAll({
      
      include: [{ model: Post }],
      //   where: { sType: 'tag'},
      //   raw:true /// query here -------------------------------------------------------
    })
    console.log(tag)

    return res.status(message.status.statusSuccess).json({ tag: tag })
  } catch (error) {
    console.log('Error in adding new tag', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

module.exports = { addTag, getTag }