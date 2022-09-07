import React from 'react'
import { getUserSelector,getUser} from '../../reduxtoolkit/slices/user/getUsersSlice'
import {deleteUserSelector,deleteUser} from "../../reduxtoolkit/slices/user/deleteUserSlice"

import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import "./GetUser.css"

const GetUser = () => {

  const dispatch = useDispatch()
  
  const { data:userData } = useSelector(getUserSelector)
  console.log(userData)

  
  const {data:deleteData} = useSelector(deleteUserSelector)
 
  
    useEffect(() => {
        dispatch(getUser())
    },[]);

  
    
    const handleDelete = (id) =>{
      dispatch(deleteUser({id}))
      dispatch(getUser())
    }
    
  return (
    <>
      <table className = "table">
        <thead className = "thead">
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>EditUser</th>
            <th>DeleteUser</th>
          </tr>
        </thead>
        <tbody className = "tbody">
            {
              userData.map((user) => (<tr key = {user.userId}>
                  <td>{user.name}</td>
                  <td>{user.userName}</td>
                  <td><button className = "edit" >Edit</button></td>
                  <td><button className = "del" onClick = {() => handleDelete(user.userId)}>Delete</button></td>
              </tr>
              ))
            }
        </tbody>
      </table>
      </>
  )
}

export default GetUser