'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const eventsController = require('../../controllers/events.controller')

router.get('/status', (req, res) => { res.send({status: 'OK'}) })

router.use('/auth', authRouter)

router.post('/event', eventsController.addEvent)


router.get('/events', eventsController.getEvent)

router.get('/myEvents', eventsController.getMyEvents)

router.delete('/deleteEvent/:id', eventsController.deleteEvent)

router.post('/subscribeToEvent', eventsController.subscribeToEvent)

router.post('/unSubscribeToEvent', eventsController.unSubscribeToEvent)
router.put('/updateEvent', eventsController.updateEvent)


// router.post("/events")

module.exports = router
