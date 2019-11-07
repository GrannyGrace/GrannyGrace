const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      await user.update({sessionId: req.sessionID})
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/restore', async (req, res, next) => {
  try {
    console.log('TCL: req.sessionID', req.sessionID)

    const [user, found] = await User.findOrCreate({
      where: {
        sessionId: req.sessionID
      }
    })

    if (found) {
      console.log('TCL: user/found', user)
    }
    if (!user) {
      console.log('in /auth/restore and user was not found/created')
    }
    if (!user.email) {
      const updated = await user.update({isGuest: true})
      res.json(updated)
    } else {
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        sessionId: req.sessionID
      }
    })
    if (!user) {
      console.log('guest user not found when signing up, check /restore route')
    }
    const updated = await user.update(req.body)
    req.login(updated, err => (err ? next(err) : res.json(updated)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  //Session.create({sessionId:req.sessionID})
  //Session.setUserId(req.user.id)
  res.json(req.user)
})

router.use('/google', require('./google'))
