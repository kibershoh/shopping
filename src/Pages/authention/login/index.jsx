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
    // const loginUser = (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // const user = userCredential.user;

    //             setIsLoading(false)
    //             toast.success("Login Successfull...")
    //             navigate('/')
    //         })
    //         .catch((error) => {
    //             setIsLoading(false)




    //         })
    // }
    const loginUser = async (e)=>{
        e.preventDefault()
        setIsLoading(true)

        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            const user = userCredential.user
            console.log(user);
            setIsLoading(false)
            toast.success("Successfully logged in ")
            navigate('/checkout')
        }catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }

    }
    // -------------------- Login With Google-------------//
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
            }).catch((error) => {
            })
    }
    return (
        <>
                {isLoading && <Loader/>}

            <div className={styles.login}>
                <form onSubmit={loginUser}>
                <h1 className={styles.title}>Login</h1>

                    <div>
                        
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email' placeholder='Your Email'
                            required
                        />
                        <label>Your Email</label>
                    </div>
                    <div>
                        
                        <input
                        required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            type='password' placeholder='Password'
                        />
                        <label>Password</label>
                    </div>

                    <button className={styles.login_btn} type="submit">
                        Login
                    </button>
                    <Link className={styles.reset_btn} to={'/reset'}>Reset password</Link>
                    
                    <p>Don't have an account? <Link to={'/register'}> Create account</Link></p>

                </form>
            </div>

        </>

    )
}

export default Login;
 