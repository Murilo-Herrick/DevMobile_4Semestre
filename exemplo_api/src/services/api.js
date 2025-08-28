import axios from "axios";


const api = axios.create({
    timeout:2000
})

export default api;