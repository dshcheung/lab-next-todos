import { useState } from 'react'
import { useRouter } from 'next/router'

import useTodo from '@/hooks/todo'

import Layout from '@/components/layouts/Layout'
import CompsLoading from '@/components/loading'
import CompsError from '@/components/error'
import CompsModalsTodosUpdate from '@/components/modals/todos/update'
import CompsModalsTodoItemsCreate from '@/components/modals/todo-items/create'

export default function SSGShow() {
  const [openTodosUpdate, setOpenTodosUpdate] = useState(false)
  const [openTodoItemsCreate, setOpenTodoItemsCreate] = useState(false)

  const { query: { id } } = useRouter()
  const { todo, isLoading, isError, errorMessage, updateTodo, destroyTodo, createTodoItem } = useTodo(id)

  if (isLoading) return <CompsLoading />
  if (isError) return <CompsError message={errorMessage} />
  return (
    <Layout>
      <div className="container my-3">
        <header className="text-center mb-3">
          <h1>{todo.title}</h1>
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => setOpenTodosUpdate(true)}
            >Edit</button>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={() => destroyTodo()}
            >Delete</button>
          </div>
        </header>

        <main className="text-center">
          <section className="mb-3">
            <h3>Todo Items</h3>
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={() => setOpenTodoItemsCreate(true)}
            >Create Item</button>
          </section>

          <section>
            <ul className="list-group">
              {
                todo.TodoItems.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <span>{item.name}</span>
                    {' '}
                    <div className="btn-group">
                      <button
                        className="btn btn-warning btn-sm"
                        type="button"
                      >Toggle</button>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                      >Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                      >Delete</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </main>

        <CompsModalsTodosUpdate
          show={openTodosUpdate}
          initialValues={todo}
          handleClose={() => setOpenTodosUpdate(false)}
          handleSubmit={(values, actions) => {
            updateTodo(values).then(() => {
              setOpenTodosUpdate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />

        <CompsModalsTodoItemsCreate
          show={openTodoItemsCreate}
          handleClose={() => setOpenTodoItemsCreate(false)}
          handleSubmit={(values, actions) => {
            createTodoItem(values).then(() => {
              setOpenTodoItemsCreate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />
      </div>
    </Layout>
  )
}
