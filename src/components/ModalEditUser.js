import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { putUpdateUser } from '../services/UserService';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalEditUser = ({user, handleEditTable}) => {
    // const [handleUpdateTable ]= props;
    // const [user, handleEditTable] = props
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        console.log(">>> check state:", res);
        if(res && res.updatedAt){
            //success
            setName("");
            setJob("");
            handleClose();
            toast.success("A User is updated succeed!");
            handleEditTable({first_name: res.name, id: user.id});
        }
        else{
            //error
            toast.error("A User is updated failed!");
        }
    };
    useEffect(() => {
      setName(user.first_name);
    },[user]);
    

    return (
      <>
        <Button variant="btn btn-warning mx-3" onClick={handleShow}>
        Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='body-add-new'>
                <div className="mb-3">
                    <label className='form-label'>Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        // placeholder="Enter User's name" 
                        placeholder= {user.first_name}
                        value={name}
                        onChange={(event)=>setName(event.target.value)}
                    />
                </div>
              
                <div className="form-group">
                    <label className='form-label'>Job</label>
                    <input type="text" className="form-control" placeholder="Enter User's job" value={job} onChange={(event)=>setJob(event.target.value)}/>
                </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalEditUser;