import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export default function useTodos() {
  const { data, error } = useSWR('https://fswdi-api-todos.herokuapp.com/api/todos', fetcher)

  return {
    meta: data?.meta,
    todos: data?.todos || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
