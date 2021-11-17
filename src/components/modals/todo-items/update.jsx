import Modal from 'react-bootstrap/Modal'

import CompsFormsTodoItemsChange from '@/components/forms/todo-items/change'

export default function CompsModalsTodoItemsUpdate({ show, initialValues, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Todo Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CompsFormsTodoItemsChange
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal.Body>
    </Modal>
  )
}
