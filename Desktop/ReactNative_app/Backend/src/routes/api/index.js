'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const eventsController = require('../../controllers/events.controller')

router.get('/status', (req, res) => { res.send({status: 'OK'}) })

router.use('/auth', authRouter)

router.post('/event', eventsController.addEvent)

// router.post("/events")

module.exports = router
