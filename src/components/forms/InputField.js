import React from 'react'

const InputField = ({ errorMsg, handleInputChange, value, name, showErrors, placeholder }) => {
    return (
        <div className="input-field">
            {showErrors && <span className="error-msg">{errorMsg}</span>}
            <input onChange={handleInputChange} value={value} name={name} type="text" placeholder={placeholder} />
        </div>
    )
}

export default InputField