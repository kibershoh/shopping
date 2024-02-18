import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../Firebase/config'

const UseAuth = () => {
    const [currentUser,setCurrentUser] = useState({})
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setCurrentUser(user)
            }
            else{
                setCurrentUser(null)

            }
        })
    },[auth])
  return {
    currentUser,
  }
}

export default UseAuth