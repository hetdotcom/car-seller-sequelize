/* eslint-disable no-unused-vars */
const { db, sequelize } = require('../model/index')
const message = require('../messages/index')

// const User = db.user
const Post = db.post
const Tag = db.tag

const addPost = async (req, res) => {
  try {
    const post = await Post.create({
      sType: req.body.sType,
      sDescription: req.body.sDescription,
      usersId: req.body.usersId,
      // sPassword: req.sHashedPass,
    })
    console.log(post.getDataValue('id'))
    console.log(post)

    return res.status(message.status.statusSuccess).json(post)
  } catch (error) {
    console.log('Error in adding new post', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

const getPost = async (req, res) => {
  try {
    // await Post.findAll()
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // const post = await Post.findOrCreate({where: {sUsername: 'Ret'}})

    const { QueryTypes } = require('sequelize')
    // const post = await sequelize.query('SELECT * FROM `users`', {
    //   type: QueryTypes.SELECT,
    // })
    // console.log(post);

    const post = await sequelize.query(
      'SELECT *, "text with literal $$1 and literal $$status" as t FROM tags WHERE sTag = :sTag',
      {
        replacements: { sTag: 'dharma' },
        type: QueryTypes.SELECT,
      }
    )
    console.log(post)

    // const post = await Post.findAll({
    //   attributes: ['sType', 'sDescription'],
    //   include: [
    //     { model: Tag, through: { attributes: [] }, attributes: ['sTag'] },
    //   ],
    //   //   where: { sType: 'post'},
    //   //   raw:true /// query here -------------------------------------------------------
    // })

    // const post = await Post.findAll({
    //   attributes: [
    //     'sUsername',
    //     [sequelize.fn('COUNT', sequelize.col('id'), 'col_count')],
    //   ],
    // })

    // const post = await Post.findAll(
    //   {
    //     attributes: ['sUsername', ['id', 'col_count']],
    //   },
    //   { raw: true, logging: console.log }
    // )

    // const post = await Post.findByPk(1, { raw: true })

    // const post = await Post.findOne({
    //   logging: console.log,
    //   raw: true,
    //   where: {
    //     id: 1,
    //   },
    // })

    // console.log(post)

    return res.status(message.status.statusSuccess).json({ post: post })
  } catch (error) {
    console.log('Error in adding new post', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

module.exports = { addPost, getPost }
