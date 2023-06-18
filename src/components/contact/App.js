import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {
  useParams,
} from "react-router-dom";
import Header from '../Header';
import Footer from '../Footer'

export default function Home(props) {
  let { id } = useParams();
  const [data, setdata] = useState([])
  const [modalShow, setmodalShow] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Lastname, setLastname] = useState("");
  const [City, setCity] = useState("");
  const [Email, setEmail] = useState("");
  const [State, setState] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Country, setCountry] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;

  useEffect(() => {
    getdata()

  }, [])
  const navigate = useNavigate();
  async function getdata() {
    await axios.get(`${process.env.REACT_APP_Contact_API}` + "/" + id)
      .then((data) => {
        if (id != "newcontact") {
          setFirstName(data.data.FirstName)
          setPhoneNumber(data.data.PhoneNumber)
          setAddress(data.data.Address)
          setLastname(data.data.Lastname)
          setEmail(data.data.Email)
          setCity(data.data.City)
          setPostalCode(data.data.PostalCode)
          setState(data.data.State)
          setCountry(data.data.Country)
        }
        setdata(data.data)
        // setFilteredList(data.data)
        console.log(data)

      })
  }
  async function postdata(postdata) {
    localStorage.setItem("userdata", true);
    await axios.post(`${process.env.REACT_APP_Contact_API}`, postdata)
      .then((data) => {
        console.log("post success")
        console.log(data)
        getdata()
        setFirstName("")
        setPhoneNumber("")
        setAddress("")
        setLastname("")
        setEmail("")
        setCity("")
        setPostalCode("")
        setState("")
        setCountry("")
        setmodalShow(false)
        toast.success('Data Saved Successfully !', {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate("/");

      })
  }
  async function updatedata(updatedata, id) {
    
    await axios.put(`${process.env.REACT_APP_Contact_API}/${id}`, updatedata)
      .then((data) => {
        console.log("update success")
        console.log(data)
        getdata()
        setFirstName("")
        setPhoneNumber("")
        setAddress("")
        setLastname("")
        setEmail("")
        setCity("")
        setPostalCode("")
        setState("")
        setCountry("")
        setmodalShow(false)
        toast.success('Data updated Successfully !', {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate("/");

      })
  }



  const cancelContact = () => {
    navigate("/");
  }




  async function onsubmit() {

    var postdatadetails = {


      "FirstName": FirstName,
      "Lastname": Lastname,
      "Email": Email,
      "PhoneNumber": PhoneNumber,
      "Address": Address,
      "City": City,
      "State": State,
      "Country": Country,
      "PostalCode": PostalCode
    }
    if (FirstName != "" && Lastname != "" && PhoneNumber != "" && Address != "" && State != "" && Country != "" && PostalCode != "" && City != "") {

      // const eregex = '[a-zA-Z0-9]+\.[a-zA-Z0-9]+@gmail\.com'
      if (!emailRegex.test(Email)) {
        toast.error('Please Enter Valid Email !', {
          position: toast.POSITION.TOP_RIGHT
        });
        return false
      }
      if (id == "newcontact") {
        postdata(postdatadetails)
      } else {
        updatedata(postdatadetails, id)
      }
    } else {
      toast.error('Please Enter All the Data !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }


  }
  return (
    <>   <Header />
      <div className='container mt-5 mb-5'>
        <ToastContainer />

        <h1 className='text-center mb-4'>{id == "newcontact" ? 'Add Contact' : 'Edit Contact'}</h1>
        



        <div>

        </div>



        <Container className='card p-3'>
          <Row>
            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="input" placeholder="Enter First Name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />

              </Form.Group>
            </Col>


            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="input" placeholder="Enter Last Name" value={Lastname} onChange={(e) => setLastname(e.target.value)} />

              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email Address" required value={Email} onChange={(e) => setEmail(e.target.value)} />

              </Form.Group>
            </Col>


            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>PhoneNumber</Form.Label>
                <Form.Control type="number" placeholder="Enter PhoneNumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={3} type="text" placeholder="Enter Address" value={Address} onChange={(e) => setAddress(e.target.value)} />

              </Form.Group>
            </Col>
          </Row>
          <Row>

            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Control type="input" placeholder="Enter City Name" value={City} onChange={(e) => setCity(e.target.value)} />

              </Form.Group>
            </Col>


            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>State</Form.Label>
                <Form.Control type="input" placeholder="Enter State Name" value={State} onChange={(e) => setState(e.target.value)} />

              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Country</Form.Label>
                <Form.Control type="input" placeholder="Enter Country Name" value={Country} onChange={(e) => setCountry(e.target.value)} />

              </Form.Group>
            </Col>


            <Col xs={6} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>PostalCode</Form.Label>
                <Form.Control type="number" placeholder="Enter PostalCode " value={PostalCode} onChange={(e) => setPostalCode(e.target.value)} />

              </Form.Group>
            </Col>

          </Row>
          <div className='py-3'>
          <Button className='mr-2' variant="success" onClick={() => onsubmit()}>{id == "newcontact" ? 'Submit' : 'Update'}</Button>
          <Button variant="secondary" onClick={cancelContact}>Cancel</Button>
        </div>
        </Container>
        
        


      </div>
      <Footer />
    </>
  )

}

