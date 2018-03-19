import React from 'react'
import InputField from './InputField'
import formCreator from './formCreator'

const EditForm = ({
    validationErrors,
    showErrors,
    handleInputChange,
    editOnSubmit,
    cancelEditing,
    name,
    email,
    phone,
    id
}) => {
    return (
        <form onSubmit={editOnSubmit}>
            <div className="flex-wrapper">
                <InputField errorMsg={validationErrors.name} handleInputChange={handleInputChange} value={name} showErrors={showErrors} name={"name"} />
                <InputField errorMsg={validationErrors.email} handleInputChange={handleInputChange} value={email} showErrors={showErrors} name={"email"} />
                <InputField errorMsg={validationErrors.phone} handleInputChange={handleInputChange} value={phone} showErrors={showErrors} name={"phone"} />
                <div className="button-row">
                    <button className="form-cancel-button" onClick={() => cancelEditing(id)}>Cancel</button>
                    <button className="form-submit-button" type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}

export default formCreator(EditForm)