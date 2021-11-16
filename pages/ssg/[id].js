import { useRouter } from 'next/router'

import { apiGetTodosIds, apiGetTodo } from '../../lib/todos'

export default function SSGShow({ todo }) {
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>
  if (!todo) return <div>No Todo</div>
  return (
    <div>
      <div>{todo.title}</div>
      <ul>
        {
          todo.TodoItems.map((item) => (
            <li key={item.id}>
              {item.checked ? 'O' : 'X'} {item.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await apiGetTodosIds()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const todo = await apiGetTodo(params.id)

  return {
    props: {
      todo
    }
  }
}
