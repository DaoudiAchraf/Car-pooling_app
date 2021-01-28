
const event = require('../models/event.model')

exports.addEvent = (req, res) => {
  console.log("user--->",req.body)
  const Event = new event(req.body)
  Event.save()
}


exports.getEvent = (req, res) => {

  event.find({user:{$ne:req.query.id}}).then(events=>{
    res.send(events);
  })
}


exports.getMyEvents = (req, res) => {

  event.find({user:req.query.id}).then(myEvents=>{
    res.send(myEvents)
  })
}


exports.deleteEvent = (req, res) => {
    
    event.findByIdAndDelete(req.params.id,(err,deleted)=>{

      event.find({user:deleted.user}).then(myEvents=>{
        res.send(myEvents)
      })

    })
}



exports.subscribeToEvent = (req, res) => {
    
      console.log(req.body);
      event.findById(req.body.idEvent).then(event=>{
      event.subscribers.push(req.body.id)
      event.places--;
      event.save();
      })
}


exports.unSubscribeToEvent = (req, res) => {
    
  event.findById(req.body.idEvent).then(event=>{
  event.subscribers=event.subscribers.filter((x)=> x!=req.body.id )
  event.places++;
  event.save();
  })
}


exports.updateEvent = (req, res) => {
    
  const evt = req.body.event

  event.findById(evt.id).then(event=>{

      event.phone=evt.phone;
      event.prix=evt.prix;
      event.places=evt.places;
      event.date=evt.date;
      event.depart=evt.depart;
      event.arrive=evt.arrive;
      event.save();
  })
}