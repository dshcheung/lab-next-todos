import axios from 'axios'

export async function apiGetTodo(id) {
  return axios({
    method: 'GET',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}`
  })
}
