import React from 'react'
import { connect } from 'react-redux'
import { _loadEvents } from '../../store/events'
import axios from 'axios'

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component {
    render() {
        if (!this.props.singleEvent || !this.state.title) {
            return null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log(this.props.singleEvent)
        return (
            <div>
                <form id="editForm" onSubmit={this.handleSubmit}>
                    <p><strong>Title:</strong> <input value={this.state.title} onChange={this.handleChange} name="title" /></p>
                    <p><strong>Description:</strong>  <input value={this.state.description} onChange={this.handleChange} name="description" /></p>
                    <p><strong>Location:</strong>  <input value={this.state.location} onChange={this.handleChange} name="location" /></p>
                    <p><strong>Date:</strong>  <input value={this.state.date} onChange={this.handleChange} name="date" /></p>
                    <p><strong>Buy-In:</strong>  <input value={this.state.stake} onChange={this.handleChange} name="stake" /></p>
                    <button type="submit">Edit</button>
                </form>
            </div>
        )
    }
    constructor({ singleEvent }) {
        super()
        this.state = {
            title: singleEvent ? singleEvent.title : '',
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
        axios.put('api/events', { id: this.props.singleEvent.id, title: ev.target.title.value, description: ev.target.description.value, location: ev.target.location.value, date: ev.target.date.value, stake: ev.target.stake.value })
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
