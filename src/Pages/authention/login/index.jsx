// Routes and React librar
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Image
import googleIcon from '../../../assets/google.png'

// Styles library
import { toast } from 'react-toastify'
import styles from './style.module.scss'

// Firebase library
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../Firebase/config'
import { Loader } from '../../../Components'


const Login = () => {
    //  ------------------ States ------------------ //
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    //  ------------------ Functions ------------------ //
    const loginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;

                setIsLoading(false)
                toast.success("Login Successfull...")
                navigate('/')
            })
            .catch((error) => {
                setIsLoading(false)




            })
    }
    // -------------------- Login With Google-------------//
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // const user = result.user;
            }).catch((error) => {
            })
    }
    return (
        <>
                {isLoading && <Loader/>}

            <div className={styles.login}>
                <form onSubmit={loginUser}>

                    <div>
                        <label>Your Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            type='email' placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            type='password' placeholder='Password'
                        />
                    </div>

                    <button className={styles.login_btn} type="submit">
                        Login
                    </button>
                    <Link to={'/reset'}>Reset password</Link>
                    <p>-- or --</p>
                    <button className={styles.with_google} type="submit"
                        onClick={signInWithGoogle}
                    >
                        <img src={googleIcon} alt="" />
                        Login With Google
                    </button>
                    <p>Don't have an account? <Link to={'/register'}> Register</Link></p>

                </form>
            </div>

        </>

    )
}

export default Login;