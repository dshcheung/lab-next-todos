import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodo(id) {
  const router = useRouter()
  const { data, error, mutate } = useSWR(id ? `https://fswdi-api-todos.herokuapp.com/api/todos/${id}` : null, fetcher)

  const updateTodo = (values) => {
    axios({
      method: 'PUT',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}`,
      data: values
    }).then(() => {
      mutate()
    })
  }

  const destroyTodo = () => {
    axios({
      method: 'DELETE',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${id}`
    }).then(() => {
      router.push('/swr')
    })
  }

  return {
    todo: data?.todo,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    updateTodo,
    destroyTodo
  }
}
