import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import {postAddUserSelector,postAddUser} from "../../reduxtoolkit/slices/user/postAddUserSlice"
import "./AddUser.css"
import { getUser } from '../../reduxtoolkit/slices/user/getUsersSlice';
const AddUser = () => {
    
    let [Name, setName] = useState ("")
    let [Username, setUsername] = useState ("")
    let [password,setPassword] = useState ("")
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data:userData} = useSelector(postAddUserSelector)

    const handleAdd = (e) => {

    e.preventDefault()
    
    if (!Name|| !Username || !password ){
        alert ("all fields are mandatory!")
    }

    else{
       const values  =  {
        Name:Name,
        Username:Username,
        password:password
       }
       console.log(values)
       dispatch(postAddUser(values))
       navigate("/users")
       dispatch(getUser())
    }

    }

    return ( 
    <>
        <h3>Create User</h3>
        <form  className = "form" onSubmit={handleAdd}>
            <div className = "inptBox">
                <div>
                    <label className = "label1" >Name:</label>
                    <input className = "ipt" type = "text" placeholder = "enter name" value = {Name} onChange = {(e) => setName(e.target.value)}/>     
                </div>

                <div>
                    <label className = "label2">Username:</label>
                    <input className = "ipt" type = "text" placeholder = "enter username" value = {Username} onChange = {(e) => setUsername (e.target.value)}/>
                </div>
                <div>
                    <label className = "label3">Password:</label>
                    <input className = "ipt"  type = "password" placeholder = "enter password" autoComplete='current-password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                </div>
            </div>
          <button className = "submit">Add</button>
        </form>       
    </>
    );
}
export default AddUser
