import Link from 'next/link'

import { apiGetTodos } from '../../lib/todos'

export default function SSGIndex({ todos }) {
  return todos.map((todo) => (
    <div key={todo.id}>
      <Link href={`/ssg/${todo.id}`}>
        <a>{todo.title}</a>
      </Link>
    </div>
  ))
}

export async function getStaticProps() {
  const todos = await apiGetTodos()

  return {
    props: {
      todos
    }
  }
}
