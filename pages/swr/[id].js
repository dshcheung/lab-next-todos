import { useRouter } from 'next/router'
import useTodo from '../../hooks/todo'

export default function SSGShow() {
  const { query: { id } } = useRouter()
  const { todo, isLoading, isError, errorMessage } = useTodo(id)

  if (isLoading) return <div>loading</div>
  if (isError) return <div>{errorMessage}</div>
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
