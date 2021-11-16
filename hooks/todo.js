import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export default function useTodo(id) {
  const { data, error } = useSWR(id ? `https://fswdi-api-todos.herokuapp.com/api/todos/${id}` : null, fetcher)

  return {
    todo: data?.todo,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
