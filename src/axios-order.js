import axios from 'axios';

const burgerInstance = axios.create(
    {
        baseURL: 'https://react-my-burger-5389d-default-rtdb.firebaseio.com/'
    }
);

export default burgerInstance;