import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../Redux/slice/authSlice'

const HideLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoading)
  if (isLoggedIn) {
    return children
  }

  return null
}

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoading)
  if (!isLoggedIn) {
    return children;
  }


  return null
}

export default HideLink