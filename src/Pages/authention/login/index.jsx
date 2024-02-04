// Routes and React librar
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Image
import { FcGoogle } from "react-icons/fc";

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
   
    const loginUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log(user);
            setIsLoading(false)
            toast.success("Successfully logged in ")
            navigate('/checkout')
        } catch (error) {
            setIsLoading(false)
            // toast.error(error.message)
        }

    }
    // -------------------- Login With Google-------------//

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate('/')
            }).catch((error) => {

            });
    }
    return (
        <>
            {isLoading && <Loader />}

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
                    <h1 onClick={signInWithGoogle} className={styles.with_google}><FcGoogle size={26} /></h1>
                    <Link className={styles.reset_btn} to={'/reset'}>Reset password</Link>

                    <p>Don't have an account? <Link to={'/register'}> Create account</Link></p>

                </form>
            </div>

        </>

    )
}

export default Login;
