import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const EditTasks = ({task}) => {
    const [show, setShow] = useState(false);
    const [sub_task_name, setTaskName] = useState(task.sub_task_name)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit
    const updateTaskName = async e => {
        e.preventDefault();
        try {
            const body = {sub_task_name};
            const response = await fetch(`http://localhost:4000/subtasks/${task.sub_task_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            window.location = '/'
        } catch (error) {
            console.error(error.message)
        }
    }
  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body><input type='text' className='form-control' value={sub_task_name} onChange={e => setTaskName(e.target.value)} /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={e => updateTaskName(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default EditTasks