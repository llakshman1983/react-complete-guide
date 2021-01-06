import axios from 'axios';

const inst = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

inst.defaults.headers.common['Authorization'] = 'AUTH TOKEN from Instance';

export default inst;