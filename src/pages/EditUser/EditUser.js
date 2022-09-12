import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,useParams } from "react-router-dom";
import "./EditUser.css"
import { getUser, getUserSelector } from '../../reduxtoolkit/slices/user/getUsersSlice';
import { putEditUserSelector,putEditUser } from '../../reduxtoolkit/slices/user/putEditUserSlice';
import axios from 'axios';

const EditUser = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {edata:editData} = useSelector(putEditUserSelector)
    
    let [data, setData] = useState([])

    let [Name,setName] = useState ("")
    let [Username,setUsername] = useState ("")
    let [password,setPassword] = useState("")

    const getUserById = async () => {
        try {
           const res = await axios.get(`http://localhost:3004/users/${id}`)
           const data = res?.data
           setData(data)

         console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getUserById()
    },[])

      
    const handleEdit = (e) => {
        e.preventDefault()

        if (!Name|| !Username || !password ){
            alert ("all fields are mandatory!")
        }
        else{
            const values = {
            
                Name:Name,
                Username:Username,
                password:password,
                
            }
            console.log(values)
            dispatch(putEditUser(id,values))
            navigate("/Users")
            dispatch(getUser())
        }
    }

  return (
    <>
        <h3>Edit User</h3>
        <form  className = "form" onSubmit={handleEdit}>
            <div className = "inptBox">
                <div>
                    <label className = "label1" >Name:</label>
                    <input className = "ipt" type = "text" placeholder = "enter name" defaultValue = {data.Name} onChange = {(e) => setName(e.target.value)}/>     
                </div>

                <div>
                    <label className = "label2">Username:</label>
                    <input className = "ipt" type = "text" placeholder = "enter username" defaultValue = {data.Username} onChange = {(e) => setUsername (e.target.value)}/>
                </div>
                <div>
                    <label className = "label3">Password:</label>
                    <input className = "ipt"  type = "password" placeholder = "enter password" autoComplete='current-password' defaultValue = {data.password} onChange = {(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <button className = "submit">Edit</button>        
        </form>     
    </>
  )
}

export default EditUser