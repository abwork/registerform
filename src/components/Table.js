import React, { Component } from 'react'
import EditForm from './forms/EditForm'
import { sortBy } from 'lodash'

const SORTS = {
	NAME: list => sortBy(list, 'name'),
	EMAIL: list => sortBy(list, 'email'),
	PHONE: list => sortBy(list, 'phone'),
};

class Table extends Component {
	constructor(props) {
		super(props)

		this.state = {
			edit: {},
			sortKey: 'NAME',
		}

		this.onSort = this.onSort.bind(this)
		this.setEditing = this.setEditing.bind(this)
		this.cancelEditing = this.cancelEditing.bind(this)
	}

	setEditing(id) {
		this.setState({ edit: { [id]: true } })
	}

	cancelEditing(id) {
		this.setState({ edit: {} })
	}

	onSort(sortKey) {
		this.setState({ sortKey })
	}

	render() {
		const { participants, deleteParticipant, editParticipant } = this.props
		const { edit, sortKey } = this.state
		const rendered = SORTS[sortKey](participants)

		return (
			<div className="table">
				<div className="table-row table-heading">
					<span><button className="inline-button" onClick={() => this.onSort('NAME')}>
						Name {sortKey === 'NAME' && <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i>}
					</button>
					</span>
					<span><button className="inline-button" onClick={() => this.onSort('EMAIL')}>
						Email {sortKey === 'EMAIL' && <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i>}
					</button>
					</span>
					<span><button className="inline-button" onClick={() => this.onSort('PHONE')}>
						Phone number {sortKey === 'PHONE' && <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i>}
					</button>
					</span>
					<div />
				</div>
				{
					rendered.map((participant) =>
						edit[participant.id] ?
							<div key={participant.id} className="table-row">
								<EditForm name={participant.name} email={participant.email} phone={participant.phone} id={participant.id} editParticipant={editParticipant} cancelEditing={this.cancelEditing} />
							</div>
							:

							<div key={participant.id} className="table-row">
								<span>{participant.name}</span>
								<span>{participant.email}</span>
								<span>{participant.phone}</span>
								<div className="edit">
									<button className="inline-button" onClick={() => this.setEditing(participant.id)}>
										<i className="fa fa-edit" style={{ fontSize: '24px' }}></i>
									</button>
									<button className="inline-button" onClick={() => deleteParticipant(participant.id)}>
										<i className="fa fa-trash" style={{ fontSize: '24px' }}></i>
									</button>
								</div>
							</div>
					)
				}
			</div>
		)
	}
}


export default Table