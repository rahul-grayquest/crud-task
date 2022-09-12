import './App.css';
import  AddUser from "./pages/AddUser/AddUser"
import GetUser from "./pages/GetUser/GetUser"
import {Routes,Route} from "react-router-dom"
import EditUser from './pages/EditUser/EditUser';

function App() {
  return (
    <div className="App">
       
      <Routes>
        <Route path = "/" element = {<AddUser />}></Route>
        <Route path = "/users" element = {<GetUser />}></Route>
        <Route path = "/users/:id" element = {<EditUser/>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
