import axios from 'axios'
import qs from 'qs'

const baseURL = 'http://localhost:5000/api/v1'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,  // 5seconds
})

const dengueClustersAPI = {
    getDengueClusters: () => {
        return axiosInstance.get('/clusters')
    }
}

export default dengueClustersAPI