
const event = require('../models/event.model')

exports.addEvent = (req, res) => {
  console.log("user--->",req.body)
  const Event = new event(req.body)
  Event.save()
}
