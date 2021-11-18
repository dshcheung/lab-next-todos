import axios from 'axios'

/* eslint-disable */
export async function apiGetTodos() {
  try {
    const { data: { todos } } = await axios({
      method: 'GET',
      url: 'https://fswdi-api-todos.herokuapp.com/api/todos'
    })

    return todos
  } catch (err) {
    throw err
  }
}

export async function apiGetTodosIds() {
  try {
    const { data: { todos } } = await axios({
      method: 'GET',
      url: 'https://fswdi-api-todos.herokuapp.com/api/todos'
    })

    return todos.map((todo) => ({
      params: {
        id: String(todo.id)
      }
    }))
  } catch (err) {
    throw err
  }
}

export async function apiGetTodo(id) {
  try {
    const { data: { todo } } = await axios({
      method: 'GET',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}`
    })

    return todo
  } catch (err) {
    throw err
  }
}
/* eslint-enable */
