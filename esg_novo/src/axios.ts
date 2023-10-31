
import axios from "axios";

export const makeRequest = axios.create({
    baseURL: 'https://elated-ant-leotard.cyclic.app/api/'
})
