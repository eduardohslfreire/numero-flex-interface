import axios from 'axios'

var Config = require('Config')
const BASE_URL = Config.serverUrl


const clientServices = {
    async request(payload){
        const res = await axios.get(`${BASE_URL}/localidades/cnls/${payload}`)
        return res.data;
    }
}