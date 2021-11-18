import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import { Todo } from '@/db/models'

import useTodo from '@/hooks/self/todo'

import Layout from '@/components/layouts/Layout'
import CompsLoading from '@/components/loading'
import CompsError from '@/components/error'
import CompsModalsTodosUpdate from '@/components/modals/todos/update'
import CompsModalsTodoItemsCreate from '@/components/modals/todo-items/create'
import CompsModalsTodoItemsUpdate from '@/components/modals/todo-items/update'

export function RenderSWRSelfShow() {
  const [openTodosUpdate, setOpenTodosUpdate] = useState(false)
  const [openTodoItemsCreate, setOpenTodoItemsCreate] = useState(false)
  const [openTodoItemsUpdate, setOpenTodoItemsUpdate] = useState(false)
  const [selectedTodoItem, setSelectedTodoItem] = useState({})
  const { query: { id } } = useRouter()

  const {
    todo, isLoading, isError, errorMessage, todoItemsIds,
    updateTodo, destroyTodo, createTodoItem, updateTodoItem, destroyTodoItem
  } = useTodo(id)

  if (isLoading) return <CompsLoading />
  if (isError) return <CompsError message={errorMessage} />
  return (
    <Layout>
      <div className="container my-3">
        <Head>
          <title>SWR Todo Show | {todo.title}</title>
        </Head>

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
                    <span className={item.checked ? 'text-danger' : ''}>{item.name}</span>
                    {' '}
                    <div className="btn-group">
                      <button
                        className="btn btn-warning btn-sm"
                        type="button"
                        disabled={todoItemsIds.includes(item.id)}
                        onClick={() => {
                          updateTodoItem({
                            ...item,
                            checked: !item.checked
                          })
                        }}
                      >Toggle</button>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setSelectedTodoItem(item)
                          setOpenTodoItemsUpdate(true)
                        }}
                      >Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        disabled={todoItemsIds.includes(item.id)}
                        onClick={() => {
                          destroyTodoItem(item)
                        }}
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

        <CompsModalsTodoItemsUpdate
          show={openTodoItemsUpdate}
          initialValues={selectedTodoItem}
          handleClose={() => setOpenTodoItemsUpdate(false)}
          handleSubmit={(values, actions) => {
            updateTodoItem(values).then(() => {
              setOpenTodoItemsUpdate(false)
            }).catch(() => {
              actions.setSubmitting(false)
            })
          }}
        />
      </div>
    </Layout>
  )
}

export default function SWRShow({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <RenderSWRSelfShow />
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const todo = await Todo.findOne({
    where: {
      id: Number(params.id) || 0
    },
    include: Todo.TodoItems
  })

  if (!todo) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      fallback: {
        [`/api/todos/${params.id}`]: { todo: todo.toJSON() }
      }
    }
  }
}
