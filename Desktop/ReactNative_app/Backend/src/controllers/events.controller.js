
const event = require('../models/event.model')

exports.addEvent = (req, res) => {
  const Event = new event(req.body)
  Event.save().then(res=>console.log(res)).catch(err=>console.log(err))


}
