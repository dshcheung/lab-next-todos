import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodos() {
  const router = useRouter()
  const { data, error } = useSWR('/api/todos', fetcher)

  const createTodo = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/todos',
      data: values
    }).then((resp) => {
      resolve()
      router.push(`/swr-self/${resp.data.todo.id}`)
    }).catch(() => {
      reject()
    })
  }))

  return {
    meta: data?.meta,
    todos: data?.todos || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createTodo
  }
}
