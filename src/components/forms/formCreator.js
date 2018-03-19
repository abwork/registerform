import React, { Component } from 'react'
import * as rules from '../../validation/rules'
import { createValidators, runValidators } from '../../validation/validator'
import { isEmpty } from 'lodash'

const fieldValidators = [
    createValidators("name", "Name", rules.required, rules.maxLength(20)),
    createValidators("email", "Email address", rules.required, rules.email, rules.maxLength(50)),
    createValidators("phone", "Phone number", rules.required, rules.maxLength(20))
]

const formCreator = (ComposedComponent) => class extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showErrors: false,
            validationErrors: {},
            ...props
        }

        this.baseState = this.state
        this.addOnSubmit = this.addOnSubmit.bind(this)
        this.editOnSubmit = this.editOnSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    addOnSubmit(event) {
        event.preventDefault()
        const { addParticipant, name, email, phone } = this.state
        let participant = { name, email, phone }
        let errors = runValidators(participant, fieldValidators)
        if (!isEmpty(errors)) {
            this.setState({ showErrors: true, validationErrors: errors })
        } else {
            addParticipant(participant)
            this.clearForm()
        }
    }

    editOnSubmit(event) {
        event.preventDefault()
        const { cancelEditing, editParticipant, name, email, phone, id } = this.state
        let participant = { name, email, phone, id }
        let errors = runValidators(participant, fieldValidators)
        if (!isEmpty(errors)) {
            this.setState({ showErrors: true, validationErrors: errors })
        } else {
            editParticipant(participant)
            cancelEditing(participant.id)
        }
    }

    handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    clearForm() {
        this.state = this.baseState
    }

    render() {
        return (
            <ComposedComponent {...this.state} handleInputChange={this.handleInputChange} addOnSubmit={this.addOnSubmit} editOnSubmit={this.editOnSubmit} />
        )
    }

}

export default formCreator
