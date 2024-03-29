import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { deleteUser } from '../services/UserService';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDeleteUser = ({user, handleDeleteTable}) => {
    // const [handleUpdateTable ]= props;
    // const [user, handleEditTable] = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteUser = async () => {
        let res = await deleteUser();
        console.log(">>> check state:", res.statusCode);
        if(res && +res.statusCode === 204){
            // success
            handleClose();
            toast.success("A User is deleted succeed!");
            handleDeleteTable(user.id);
        }
        else{
            //error
            toast.error("A User is deleted failed!");
        }
    };

    return (
      <>
        <Button variant="btn btn-danger mx-3" onClick={handleShow}>
        Delete
        </Button>
  
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span>Are you sure to delete username: <strong>{user.first_name}</strong></span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalDeleteUser;