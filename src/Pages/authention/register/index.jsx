// ------------Routes and React library------------//
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ------------Styles library-------------//
import { MdAddAPhoto } from "react-icons/md";

// ------------Styles library-------------//
import styles from '../login/style.module.scss'
import { toast } from 'react-toastify';

// ------------Firebase library-------------//
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../../Firebase/config';
import { Loader } from '../../../Components';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';





const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const registerUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    // ~~~~~~~~~~with try catch ~~~~~~~~~~~~~//

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const date = Date.now();

      const storageRef = ref(storage, `${username / date}`);
      const UploadTask = uploadBytesResumable(storageRef, fileUrl);

      UploadTask.on(() => {
        toast.error('jhgcfxdgchbjknm')
      },

        async () => {
          try {
            const downloadUrl = await getDownloadURL(UploadTask.snapshot.ref);

            await updateProfile(user, {
              displayName: username,
              photoURL: downloadUrl,
            });

            await setDoc(doc(db, `${username}`, user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadUrl,
            });
            navigate('/login')
          } catch (error) {

          }

        }

      );
      setLoading(false)
      toast.success('Accaunt created')
    } catch (error) {
      setLoading(false)
      toast.error('Bitta narsada oxirida');
      console.error(error);
    }

  }
  

  const actives = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      {loading && <Loader />}

      <div className={styles.login}>
        <form onSubmit={registerUser}>
          <h1 className={styles.title}>Register</h1>

          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required

              type='text'
              placeholder='Username'
            />
            <label>Username</label>
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type='email'
              placeholder='Your Email'
            />
            <label>Your Email</label>
          </div>
          
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type='password'
              placeholder='Password'
            />
            <label>Password</label>
          </div>

          <div className={styles.file_input}>
            <h2 className={styles.choose_file} onClick={actives}>
              <MdAddAPhoto className={styles.camera} />
              <p>Download Photo</p>
            </h2>
            <input

              ref={fileInputRef}
              onChange={(e) => {
                setFileUrl(e.target.files[0])

              }}
              type='file'
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