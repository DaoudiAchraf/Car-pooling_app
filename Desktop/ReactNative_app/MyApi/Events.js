import client from './Client';

const AddEvent = ({phone,depart,arrive,places,date}) => client.post('/event',{
    phone,
    depart,
    arrive,
    places,
    date});

const getEvent = () => client.get('/events',{email,password});

export default
{
    AddEvent,
    getEvent
}