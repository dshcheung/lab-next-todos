import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export default function SSGShow() {
  const { query: { id } } = useRouter()
  const { data } = useSWR(`https://fswdi-api-todos.herokuapp.com/api/todos/${id}`, fetcher)

  if (data === undefined) return <div>loading</div>
  if (!data.todo) return <div>No Todo</div>
  return (
    <div>
      <div>{data.todo.title}</div>
      <ul>
        {
          data.todo.TodoItems.map((item) => (
            <li key={item.id}>
              {item.checked ? 'O' : 'X'} {item.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
