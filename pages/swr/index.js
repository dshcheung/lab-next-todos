import Link from 'next/link'

import useTodos from '../../hooks/todos'

export default function SWRIndex() {
  const { todos, isLoading, isError, errorMessage, createTodo } = useTodos()

  if (isLoading) return <div>loading</div>
  if (isError) return <div>{errorMessage}</div>
  // if (todos.length === 0) return <div>No Todos</div>
  return (
    <div>
      <button onClick={() => createTodo({ title: 'hi' })}>New Todo</button>
      {
        todos.map((todo) => (
          <div key={todo.id}>
            <Link href={`/swr/${todo.id}`}>
              <a>{todo.title}</a>
            </Link>
          </div>
        ))
      }
    </div>
  )
}
