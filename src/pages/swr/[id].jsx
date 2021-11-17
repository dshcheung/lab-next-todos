import { useState } from 'react'
import { useRouter } from 'next/router'
import useTodo from '@/hooks/todo'

import CompsModalsTodosCreate from '@/components/modals/todos/create'

export default function SSGShow() {
  const [openTodosCreate, setOpenTodosCreate] = useState(false)

  const { query: { id } } = useRouter()
  const { todo, isLoading, isError, errorMessage, updateTodo, destroyTodo } = useTodo(id)

  if (isLoading) return <div>loading</div>
  if (isError) return <div>{errorMessage}</div>
  return (
    <div className="container my-3">
      <header className="text-center mb-3">
        <h1>{todo.title}</h1>
        <div className="btn-group">
          <button className="btn btn-primary btn-sm" type="button" onClick={() => setOpenTodosCreate(true)}>Edit</button>
          <button className="btn btn-danger btn-sm" type="button" onClick={() => destroyTodo()}>Delete</button>
        </div>
      </header>

      <main className="text-center">
        <h3>Todo Items</h3>
        <button className="btn btn-primary btn-sm" type="button">Create Item</button>
        <ul>
          {
            todo.TodoItems.map((item) => (
              <li key={item.id}>
                {item.checked ? 'O' : 'X'}
                {' '}
                {item.name}
              </li>
            ))
          }
        </ul>
      </main>

      <CompsModalsTodosCreate
        show={openTodosCreate}
        handleClose={() => setOpenTodosCreate(false)}
        handleSubmit={(values, actions) => {
          updateTodo(values).then(() => {
            setOpenTodosCreate(false)
          }).catch(() => {
            actions.setSubmitting(false)
          })
        }}
      />
    </div>
  )
}
