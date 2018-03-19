import React, { Component } from 'react'
import Table from './components/Table'
import AddForm from './components/forms/AddForm'
import Header from './components/Header'
import { uniqueId } from 'lodash'

const generateParticipants = () => {
	const participants = new Map()
	for (let i = 0; i < 20; i++) {
		let id = uniqueId()
		participants.set(id, { id, name: 'Emma Watson' + i, email: 'emma.watson@yahoo.com', phone: '+14442066938' })
	}
	return participants
}

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			participants: generateParticipants(),
		}
		
		this.editParticipant = this.editParticipant.bind(this)
		this.addParticipant = this.addParticipant.bind(this)
		this.deleteParticipant = this.deleteParticipant.bind(this)
	}

	render() {
		const { participants } = this.state
		const list = Array.from(participants.values())
		return (
			<div className="App">
				<Header />	
				<div className="main-container">
					<h2>List of participants</h2>
					<AddForm addParticipant={this.addParticipant} />
					<Table deleteParticipant={this.deleteParticipant} editParticipant={this.editParticipant} participants={list} />
				</div>
			</div>
		)
	}

	deleteParticipant(id) {
		const { participants } = this.state
		participants.delete(id)
		this.setState({ participants })
	}

	addParticipant(participant) {
		const { participants } = this.state
		participant.id = uniqueId()
		participants.set(participant.id, participant)
		this.setState({ participants })
	}

	editParticipant(participant) {
		const { participants } = this.state
		participants.set(participant.id, participant)
		this.setState({ participants })
	}

}

export default App;
