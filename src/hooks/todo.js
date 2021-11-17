import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import produce from 'immer'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodo(id) {
  const router = useRouter()
  const { data, error, mutate } = useSWR(id ? `https://fswdi-api-todos.herokuapp.com/api/todos/${id}` : null, fetcher)

  const updateTodo = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}`,
      data: values
    }).then((resp) => {
      resolve()
      mutate(resp.data)
    }).catch(() => {
      reject()
    })
  }))

  const destroyTodo = () => {
    axios({
      method: 'DELETE',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}`
    }).then(() => {
      router.push('/swr')
    })
  }

  const createTodoItem = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}/todo-items`,
      data: values
    }).then((resp) => {
      resolve()
      mutate(produce(data, (draft) => {
        draft.todo.TodoItems.push(resp.data.todoItem)
      }))
    }).catch(() => {
      reject()
    })
  }))

  return {
    todo: data?.todo,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    updateTodo,
    destroyTodo,
    createTodoItem
  }
}
