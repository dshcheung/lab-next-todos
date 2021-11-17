import Modal from 'react-bootstrap/Modal'

import CompsFormsTodosChange from '@/components/forms/todos/change'

export default function CompsModalsTodosCreate({ show, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CompsFormsTodosChange
          handleSubmit={handleSubmit}
          initialValues={{
            title: ''
          }}
        />
      </Modal.Body>
    </Modal>
  )
}
