import React from 'react'
import InputField from './InputField'
import formCreator from './formCreator'

const AddForm = (props) => {
    const { 
        validationErrors,
        showErrors,
        handleInputChange,
        addOnSubmit,
        name='',
        email='',
        phone='',
    } = props

    return (
        <form onSubmit={addOnSubmit}>
            <div className="flex-wrapper">
                <InputField errorMsg={validationErrors.name} handleInputChange={handleInputChange} value={name} showErrors={showErrors} name={"name"} placeholder={"Name"} />
                <InputField errorMsg={validationErrors.email} handleInputChange={handleInputChange} value={email} showErrors={showErrors} name={"email"} placeholder={"Email address"}/>
                <InputField errorMsg={validationErrors.phone} handleInputChange={handleInputChange} value={phone} showErrors={showErrors} name={"phone"} placeholder={"Phone number"}/>
                <div>
                    <button className="form-submit-button" type="submit">Add new</button>
                </div>
            </div>
        </form>
    )
}


export default formCreator(AddForm)