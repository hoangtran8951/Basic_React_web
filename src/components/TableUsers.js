import { useEffect, useMemo, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fecthAllUser } from '../services/UserService';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _ from 'lodash';
import "./TableUser.scss";
import { CSVLink } from "react-csv";
import ModalUploadFile from './ModalUploadFile';
import Papa from 'papaparse';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from '@mui/material';

const TableUsers = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [inputSearch, setInputSearch] = useState("");
    const [page, setPage] = useState(1);
    useEffect(() => {
          getUser(1);
    },[])
    const getUser = async (page) => {
        let res = await fecthAllUser(page);
        if(res && res.data){
          setTotalPages(res.total_pages);
          setListUser(res.data);
        }
    }

    const handleUpdateTable = (user) => {
      setListUser([user, ...listUser]);
    }
    const handleEditTable = (user) => {
      const CloneList = _.cloneDeep(listUser);
      let index = CloneList.findIndex(item => item.id === user.id);
      CloneList[index].first_name = user.first_name;
      setListUser(CloneList);
    }
    const handleDeleteTable = (id) => {
      let CloneList = _.cloneDeep(listUser);
      CloneList = CloneList.filter((item) => item.id !== id);
      setListUser(CloneList);
    }
    const handleSorting = (sortby, sortfield) => {
      let CloneList = _.cloneDeep(listUser);
      CloneList = _.orderBy(CloneList, [sortfield], [sortby]);
      setListUser(CloneList);
    }
    const handleSearchByEmail = () => {
      if(inputSearch !== ""){
        let CloneList = _.cloneDeep(listUser);
        CloneList = CloneList.filter((item) => { return item.email.includes(inputSearch);});
        if(CloneList.length === 0){
          getUser(page);
          CloneList = _.cloneDeep(listUser);
          CloneList = CloneList.filter((item) => { return item.email.includes(inputSearch);});
        }

        if(CloneList.length === 0){
          toast.error("Email not found");
        }
        else
          setListUser(CloneList);
      }
      else
        getUser(page);
    };
    const deboundSearch = useMemo( () => _.debounce(handleSearchByEmail, 300),[inputSearch])
    useEffect(()=>{deboundSearch()},[deboundSearch])
    // console.log(listUser);
    const handleImportCSV = (event) => {
      if(event.target && event.target.files && event.target.files[0]){
        let newList = [];
        for(let i = 0; i < event.target.files.length; i++){
          let file = event.target.files[i];
          if(file.type !== "text/csv" ){
            toast.error(`The file ${<strong>${event.target.files[i].name}</strong>} is not in csv format`);
            return;
          }
          Papa.parse(file, {
            complete: function(results) {
              let rawdata = results.data;
              if(rawdata.length > 0){
                if(rawdata[0] && rawdata[0].length === 3){
                  if(rawdata[0][0] !== 'email' || rawdata[0][1] !== 'first_name' || rawdata[0][2] !== 'last_name'){
                    toast.error(`The file ${event.target.files[i].name} has wrong format header CSV file!`);
                    toast.warning(`The valid headers are email, first_name, last_name respectively`);
                  }
                  else {
                    // let result = [];
                    rawdata.map((item, index) => {
                      if(index > 0){
                        if(item.length === 3){
                          let obj = {};
                          obj.email = item[0];
                          obj.first_name = item[1];
                          obj.last_name = item[2];
                          newList.push(obj);
                        }
                      }
                      return index;
                    })
                    if(i === event.target.files.length -1){
                      setListUser(newList.concat(listUser));
                      toast.success(`Import file ${event.target.files[i].name} successfully`)
                    }
                  }
                }
                else  
                  toast.error(`The file ${event.target.files[i].name} has wrong format CSV file!`);
              }
              else
                toast.error(`Not found any data in ${event.target.files[i].name} file`);
            }
          });
          
        }
        
      }
    }
   
    const headers =[
      {label: "ID", key: "id"},
      {label: "First Name", key: "first_name"},
      {label: "Last Name", key: "last_name"},
      {label: "Email", key: "email"},
      // {label: "Avatar", key: "avatar"}
    ]
    const handlePageChange = (event, value) => {
      setPage(value);
      getUser(+value);
    }
    return (<>
      <div className="my-3 add-new d-sm-flex">
          <span><b>List Users:</b></span>
          <div className='group-btns mt-sm-0 mt-2'>
            {/* <label className='btn btn-warning' htmlFor='file'><i className="fa-solid fa-file-import"></i> Import</label>
            <input id='file' type="file" hidden
              onChange={event => {handleImportCSV(event); event.target.value=null;}}></input> */}
            <ModalUploadFile 
              handleImportCSV={handleImportCSV}  
            />
            <CSVLink 
              filename={'user-info.csv'}
              className='btn btn-primary'
              target="_blank"
              data={listUser}
              headers={headers}
            ><i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
            {/* <CSVDownload data={csvData} target="_blank" /> */}
            <ModalAddNew
              handleUpdateTable={handleUpdateTable}
            />
          </div>
      </div>
      <div className='col-12 col-sm-4 my-3'>
        <input className='form-control' placeholder='Search user by email....' value={inputSearch} onChange={event => {setInputSearch(event.target.value)}}/>
      </div>
      <div className='cus-table'>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className='sort-header'>
                <span>
                  ID
                </span>
                <span>
                  <div className="box">
                    <i 
                      className="fa-solid fa-caret-up"
                      onClick={() => handleSorting('asc','id')}></i>
                    <i 
                      className="fa-solid fa-caret-down"
                      onClick={() => handleSorting('desc','id')}></i>
                  </div>
                </span> 
              </div>
            </th>
            <th>
              <div className='normal-header'>
                Email
              </div>
            </th>
            <th>
              <div className='sort-header'>
                <span>
                First Name
                </span>
                <span>
                  <div className="box">
                    <i 
                      className="fa-solid fa-caret-up"
                      onClick={() => handleSorting('asc','first_name')}></i>
                    <i 
                      className="fa-solid fa-caret-down"
                      onClick={() => handleSorting('desc','first_name')}></i>
                  </div>
                </span> 
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {listUser && listUser.length > 0 &&
        listUser.map((item, index) => {
              return (
                  <tr key={`users-${index}`}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        {/* <button className='btn btn-warning mx-3'>Edit</button> */}
                        <ModalEditUser 
                          user={item}
                          handleEditTable={handleEditTable}
                        />
                        {/* <button className='btn btn-danger mx-3'>Delete</button> */}
                        <ModalDeleteUser
                          user={item}
                          handleDeleteTable={handleDeleteTable}
                        />
                      </td>
                  </tr>
              )
        })
        }
          
        </tbody>
      </Table>
    </div>
    {/* <div className='pagination-center'>
      <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={0}
          pageCount={totalPages}
          // pageCount={69}
          previousLabel="< previous"
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
        />
      </div> */}
      <div className='pagination-center'>
        <Pagination 
          count={totalPages}
          color="primary" 
          page={page}
          siblingCount={0}
          onChange={handlePageChange}  
        />

      </div>
   
    </>)
}

export default TableUsers;