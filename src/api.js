import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// fetch all endpoints — called when page loads
export const getAllEndpoints = () => {
    console.log("get api called");
    
  return API.get('/endpoints')
}

// create new endpoint — called when dialog Save is clicked
export const createEndpoint = (data) => {
  return API.post('/endpoint', data)
}

// update existing endpoint — called when editing
export const updateEndpoint = (id, data) => {
  return API.put(`/endpoint/${id}`, data)
}

// delete endpoint — called when delete button clicked
export const deleteEndpoint = (id) => {
  return API.delete(`/endpoint/${id}`)
}