import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export default function SWRIndex() {
  const { data } = useSWR('https://fswdi-api-todos.herokuapp.com/api/todos', fetcher)

  if (data === undefined) return <div>loading</div>

  return data.todos.map((todo) => (
    <div key={todo.id}>
      <Link href={`/swr/${todo.id}`}>
        <a>{todo.title}</a>
      </Link>
    </div>
  ))
}
