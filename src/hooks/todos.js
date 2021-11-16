import useSWR from 'swr'
import axios from 'axios'
import produce from 'immer'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodos() {
  const { data, error, mutate } = useSWR('https://fswdi-api-todos.herokuapp.com/api/todos', fetcher)

  const createTodo = (values) => {
    axios({
      method: 'POST',
      url: 'https://fswdi-api-todos.herokuapp.com/api/todos',
      data: values
    }).then((resp) => {
      // Tell SWR to refresh the data directly
      // mutate()

      // Tell SWR to update with the response data and then
      // revalidate the data with a get request
      mutate(produce(data, (draft) => {
        draft.todos.push(resp.data.todo)
      }))
    })
  }

  return {
    meta: data?.meta,
    todos: data?.todos || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createTodo
  }
}
