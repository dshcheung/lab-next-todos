import Modal from 'react-bootstrap/Modal'

import CompsFormsTodoItemsChange from '@/components/forms/todo-items/change'

export default function CompsModalsTodoItemsCreate({ show, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Todo Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CompsFormsTodoItemsChange
          handleSubmit={handleSubmit}
          initialValues={{
            name: '',
            checked: false
          }}
        />
      </Modal.Body>
    </Modal>
  )
}
