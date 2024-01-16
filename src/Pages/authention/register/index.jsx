// ------------Routes and React library------------//
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ------------Styles library-------------//
import styles from '../login/style.module.scss'
import { toast } from 'react-toastify';

// ------------Firebase library-------------//
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase/config';
import { Loader } from '../../../Components';





const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
const navigate = useNavigate()
  const registerUser = (e) => {
    e.preventDefault()
    console.log(email, " ", password, " ", confirmPassword,);
    if (password !== confirmPassword) {
      toast.error("Password do not match.")

    }
    setLoading(true)
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log(user);
      setLoading(false)
      toast.success("Registeration SUccessfull...")
      navigate('/login')

    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(error.message)
      setLoading(false)
    })
  }
  return (
    <>
           {isLoading && <Loader/>}

      <div className={styles.login}>
        <form onSubmit={registerUser}>

          <div>
            <label>Your Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required

              type='email' placeholder='Your Email'
            />
          </div>
          <div>
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

              type='password' placeholder='Password'
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required

              type='password' placeholder='Confirm Password'
            />
          </div>

          <button className={styles.login_btn} type="submit">
            Register
          </button>


          <p>Already an account? <Link to={'/login'}> Login</Link></p>

        </form>
      </div>
    </>


  )
}

export default Register;