import client from './Client';

const register = (name,email,password) => client.post('/auth/register',{name,email,password});
const login = (email,password) => client.post('/auth/login',{email,password});

export default
{
    register,
    login
}