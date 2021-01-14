import client from './Client';

const AddEvent = ({user,phone,depart,arrive,prix,places,date}) => client.post('/event',{
    user,
    phone,
    depart,
    arrive,
    prix,
    places,
    date});

const getEvent = () => client.get('/events',{email,password});

export default
{
    AddEvent,
    getEvent
}