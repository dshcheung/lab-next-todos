import { useState } from 'react'
import Link from 'next/link'

import useTodos from '@/hooks/todos'

import Layout from '@/components/layouts/Layout'
import CompsLoading from '@/components/loading'
import CompsError from '@/components/error'
import CompsModalsTodosCreate from '@/components/modals/todos/create'

export default function SWRIndex() {
  const [openTodosCreate, setTodosCreate] = useState(false)

  const { todos, isLoading, isError, errorMessage, createTodo } = useTodos()

  if (isLoading) return <CompsLoading />
  if (isError) return <CompsError message={errorMessage} />
  return (
    <Layout>
      <div className="container my-3">
        <header className="text-center mb-3">
          <h1>Todos Index</h1>
          <div className="btn-group">
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={() => setTodosCreate(true)}
            >New Todo</button>
          </div>
        </header>

        <main className="text-center">
          {
            todos.map((todo) => (
              <div key={todo.id}>
                <Link href={`/swr/${todo.id}`}>
                  <a>{todo.title}</a>
                </Link>
              </div>
            ))
          }
        </main>

        <CompsModalsTodosCreate
          show={openTodosCreate}
          handleClose={() => setTodosCreate(false)}
          handleSubmit={(values, actions) => {
            createTodo(values).then(() => {
              setTodosCreate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />
      </div>
    </Layout>
  )
}
