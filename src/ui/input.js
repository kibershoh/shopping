import React, { useState } from 'react'

const Input = ({ name, state, setState,type }) => {

    return (
        <div className="mb-3">
            <label className="block mb-2 text-lg font-medium text-black dark:text-white">{name}</label>
            <input
                value={state}
                onChange={e => setState(e.target.value)}
                type={type} id={type} className="w-full focus:ring-1 focus:ring-blue-600  outline-none rounded-lg border-1 border-blue-500 p-2  " placeholder={name} />
        </div>
    )
}

export default Input;