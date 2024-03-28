import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";




export default function ContactList() {
  const [customers, setCustomers] = useState([]);
  const [lockedCustomers, setLockedCustomers] = useState([]);


  const navigate = useNavigate();


  useEffect(() => {
    getdata()

  }, [])

  async function getdata() {
    await axios.get(`${process.env.REACT_APP_Contact_API}`)
      .then((data) => {
        var fdata = data.data
        const sortedDesc = fdata.reverse()
        setCustomers(sortedDesc)
        console.log(sortedDesc)
       
        if(localStorage.getItem("userdata") != undefined && localStorage.getItem("userdata") != 'false' ){
          let gdata = localStorage.getItem("userdata")
         
            if(sortedDesc[0] != undefined){
              toggleLock(sortedDesc[0],false,0)
              sortedDesc.shift()
               setCustomers(sortedDesc)
          }
           localStorage.setItem("userdata", false);
        }
     

      })
  }
  async function deletedata(id) {
    await axios.delete(`${process.env.REACT_APP_Contact_API}/${id}`)
      .then((data) => {
        console.log("delete success")
        console.log(data)
        toast.success('Data Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT
        });
        getdata()


      })
  }
  const editContact = (id) => {

    navigate("/home/" + id);


  }
  const deleteContact = (id) => {
    deletedata(id)
  }
  const addContact = () => {

    navigate("/home/newcontact");
  }


  const lockTemplate = (rowData, options) => {
    const icon = options.frozenRow ? 'pi pi-flag-fill' : 'pi pi-flag';
    const disabled = options.frozenRow ? false : lockedCustomers.length >= 20;

    return <Button type="button" icon={icon} disabled={disabled} className="p-button-sm p-button-text" onClick={() => toggleLock(rowData, options.frozenRow, options.rowIndex)} />;
  };
  const editTemplate = (rowData, options) => {
    const id = rowData.id
    return <Button type="button" icon='pi pi-pencil' className="p-button-sm p-button-text" onClick={() => editContact(rowData.id)} />;
  };

  const deleteTemplate = (rowData, options) => {
    const id = rowData.id
    return <Button type="button" icon='pi pi-trash' className="p-button-sm p-button-text" onClick={() => deleteContact(rowData.id)} />;
  };
  const toggleLock = (data, frozen, index) => {
    let _lockedCustomers, _unlockedCustomers;

    if (frozen) {
      _lockedCustomers = lockedCustomers.filter((c, i) => i !== index);
      _unlockedCustomers = [...customers, data];
    } else {
      _unlockedCustomers = customers.filter((c, i) => i !== index);
      _lockedCustomers = [...lockedCustomers, data];
    }

    _unlockedCustomers.sort((val1, val2) => {
      return val1.id < val2.id ? -1 : 1;
    });

    setLockedCustomers(_lockedCustomers);
    setCustomers(_unlockedCustomers);
  };
  return (
    <>
      <Header />
      <div className='container mt-5 mb-5'>

        <ToastContainer />



        <ToastContainer />
        <Container>
          <Row className='mb-3'>
            <Col xs={6} md={6}>
              <h1 className=''>Contact List</h1>
            </Col>
            <Col xs={6} md={6}>
              <div className='float-right'>
                <Button variant="dark" onClick={() => { addContact() }}>Add Contact</Button>
              </div>

            </Col>

          </Row>
          <div className="card">
            <DataTable value={customers} frozenValue={lockedCustomers} scrollable tableStyle={{ minWidth: '50rem' }}>
              <Column field="FirstName" header="FirstName" sortable></Column>
              <Column field="Lastname" header="Lastname" sortable></Column>
              <Column field="Email" header="Email" sortable></Column>
              <Column field="PhoneNumber" header="PhoneNumber" sortable></Column>
              <Column field="Address" header="Address" sortable></Column>
              <Column field="City" header="City" sortable></Column>
              <Column field="State" header="State" sortable></Column>
              <Column field="Country" header="Country" sortable></Column>
              <Column field="PostalCode" header="PostalCode" sortable></Column>
              <Column style={{ flex: '0 0 4rem' }} body={lockTemplate}></Column>
              <Column style={{ flex: '0 0 4rem' }} body={editTemplate}></Column>
              <Column style={{ flex: '0 0 4rem' }} body={deleteTemplate}></Column>
            </DataTable>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}