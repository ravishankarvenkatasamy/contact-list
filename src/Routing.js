import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from './components/contact_list/ContactList'
import Home from './components/contact/App'



function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ContactList}> </Route>
        <Route path="/Home/:id" Component={Home}> </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Routing