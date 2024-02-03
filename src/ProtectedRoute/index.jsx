import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UseAuth from '../Custom Hooks/UseAuth'

const ProtectedRoute = ({children}) => {
    const {currentUser} = UseAuth()
    return currentUser ? children : <Navigate to={'/login'}/>
  
}

export default ProtectedRoute