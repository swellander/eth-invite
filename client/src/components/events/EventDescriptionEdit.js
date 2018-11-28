import React from 'react'
import { connect } from 'react-redux'
import { _loadEvents } from '../../store/events'
import axios from 'axios'

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component {
    render() {
        if (!this.props.singleEvent || !this.state.name) {
            return null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        return (
            <div>
                <form id="editForm" onSubmit={this.handleSubmit}>
                    <p><strong>Name:</strong> <input value={this.state.name} onChange={this.handleChange} name="name" /></p>
                    <p><strong>Description:</strong>  <input value={this.state.description} onChange={this.handleChange} name="description" /></p>
                    <p><strong>location:</strong>  <input value={this.state.location} onChange={this.handleChange} name="location" /></p>
                    <p><strong>date:</strong>  <input value={this.state.date} onChange={this.handleChange} name="time" /></p>
                    <p><strong>Buy-In:</strong>  <input value={this.state.stake} onChange={this.handleChange} name="stake" /></p>
                    <button type="submit">Edit</button>
                </form>
            </div>
        )
    }
    constructor({ singleEvent }) {
        super()
        this.state = {
            name: singleEvent ? singleEvent.name : '',
            description: singleEvent ? singleEvent.description : '',
            location: singleEvent ? singleEvent.location : '',
            date: singleEvent ? singleEvent.date : '',
            stake: singleEvent ? singleEvent.stake : 0
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(ev) {
        this.setState({ [ev.target.name]: ev.target.value });
    }
    handleSubmit(ev) {
        ev.preventDefault()
        axios.put('api/events', { id: this.props.singleEvent.id, name: ev.target.name.value, description: ev.target.description.value, location: ev.target.location.value, date: ev.target.date.value, stake: ev.target.stake.value })
            .then(() => this.props.loadEvents())
            .catch((error) => console.log(error))
    }
}

const mapStateToProps = (state) => {
    let singleEvent = state.events.filter(elem => elem.id === state.eventId)
    return { singleEvent: singleEvent[0] }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadEvents: () => {
            dispatch(_loadEvents())
            dispatch({ type: 'TOGGLE_EDIT_MODE', editMode: false })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDescription)
