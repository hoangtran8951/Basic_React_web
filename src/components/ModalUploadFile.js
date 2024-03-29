import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './ModalUploadFile.scss'


const ModalUploadFile = ({handleImportCSV}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef(null);
    const handleDrag = (e) => {
     
      e.stopPropagation();
      e.preventDefault();
      // console.log(e);
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    const handleDrop = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      setDragActive(false);
      // console.log(e);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // handleFiles(e.dataTransfer.files);
        let event = e;
        event.target = e.dataTransfer;
        event.target.files = e.dataTransfer.files;
        handleImportCSV(event);
        handleClose();
      }
    };
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        // handleFiles(e.target.files);
        handleImportCSV(e);
        handleClose();
      }
    };
    
    const onButtonClick = () => {
      inputRef.current.click();
    };

    return (
      <>
        <Button variant="btn btn-warning" onClick={handleShow}>
        <i className="fa-solid fa-file-import"></i> Import
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import File</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-cus-body'>
           <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
              <div>
                <p>Drag and drop your file here or</p>
                <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
              </div> 
            </label>
            { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleUploadFile}>
              Upload
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalUploadFile;