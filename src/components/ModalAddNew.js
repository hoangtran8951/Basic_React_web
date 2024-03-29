import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddNew = ({handleUpdateTable}) => {
    // const [handleUpdateTable ]= props;
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = async () => {
       
        let res = await postCreateUser(name, job);
        console.log(">>> check state:", res);
        if(res && res.id){
            //success
            setName("");
            setJob("");
            handleClose();
            toast.success("A User is created succeed!");
            handleUpdateTable({first_name: name, id: res.id});
        }
        else{
            //error
            // handleClose();
            toast.error("A User is created failed!");
        }
    };

    

    
  
    return (
      <>
        
        <Button variant="btn btn-success" onClick={handleShow}>
        <i className="fa-solid fa-plus"></i> Add new
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='body-add-new'>
                <div className="mb-3">
                    <label className='form-label'>Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter User's name" 
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
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalAddNew;