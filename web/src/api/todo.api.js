import axios from "../utils/axios"

async function list() {
  return await axios.get("/todos")
}

async function get(id) {
  return await axios.get(`/todos/${id}`)
}

async function create(data) {
  return await axios.post("/todos", data)
}

async function edit(id, data) {
  return await axios.put(`/todos/${id}`, data)
}

async function remove(id) {
  return await axios.delete(`/todos/${id}`)
}

export { list, get, create, edit, remove }
