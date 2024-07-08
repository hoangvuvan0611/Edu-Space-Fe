import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.0.10:8080',
    headers: {
        "Content-Type": 'application/json',
        "ngrok-skip-browser-warning": "true",
    },
})
