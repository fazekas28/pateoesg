
import axios from "axios";

export const makeRequest = axios.create({
    baseURL: 'https://gifted-bass-shoulder-pads.cyclic.cloud/api/'
})
