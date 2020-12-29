import { create } from 'apisauce'

const apiClient = create({
  baseURL: 'http://192.168.1.2:3000/api'

})

export default apiClient;