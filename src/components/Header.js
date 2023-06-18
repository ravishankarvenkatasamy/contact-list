import { React } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';




export default function Header() {
    return (
        <>
        <div>
         
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
       <div className="container">
        <a class="navbar-brand" href="#">
            <i className='iconw pi pi-wifi pl-3'></i>
           </a>
           <span className='logon'> WiLane Tech</span>
 

        <button class="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse ml-3" id="navbarSupportedContent">
           
          
          <ul class="navbar-nav mr-auto gap-3">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Career</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Our Team</a>
            </li>
         
          </ul>
         
        </div>
        </div>
      </nav>
      </div>
   
      </>
  )
}