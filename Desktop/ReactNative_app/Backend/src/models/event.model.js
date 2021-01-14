
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  user:
  {
    type:String
  },
  date: {
    type: Date
  },
  places: {
    type: Number
  },
  phone: {
    type: Number
  },
  depart: {
    name: {type: String},
    latlng: {
      longitude: {type: Number},
      latitude: {type: Number}
    }
  },
  arrive: {
    name: {type: String},
    latlng: {
      longitude: {type: Number},
      latitude: {type: Number}
    }
  }
})

module.exports = mongoose.model('Event', eventSchema)
