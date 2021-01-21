import client from './Client';

const AddEvent = ({user,phone,depart,arrive,prix,places,date}) => client.post('/event',{
    user,
    phone,
    depart,
    arrive,
    prix,
    places,
    date});

// const getEvent = () => client.get('/events',{email,password});

const getEvent = (id) => client.get('/events',{id});


const getMyEvents = (id) => {
    return client.get("/myEvents",{id});
}


const deleteEvent = (id) => {
    return client.delete("/deleteEvent/"+id);
}


const subscribeToEvent = (id,idEvent) => {
    return client.post("/subscribeToEvent",{id,idEvent});
}


const unSubscribeToEvent = (id,idEvent) => {
    return client.post("/unSubscribeToEvent",{id,idEvent});
}

export default
{
    AddEvent,
    getEvent,
    getMyEvents,
    deleteEvent,
    subscribeToEvent,
    unSubscribeToEvent,
}