import React, { useState } from 'react'
import styles from './style.module.scss'
const Input = ({ name, state, setState,type }) => {

    return (
        <div className={styles.input}>
            <label>{name}</label>
            <input
               
                value={state}
                onChange={e => setState(e.target.value)}
                type={type} id={type} placeholder={name} />
        </div>
    )
}

export default Input;