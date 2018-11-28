import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import {_loadUserEvents, _deleteUserEvents} from '../../store/userevents'

// eslint-disable-next-line react/prefer-stateless-function
class EventUsers extends React.Component{
    render(){
        if (!this.props.userEvents){
            return null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        return (
            <div>
                <h4><p align="center">Attendees</p></h4>
                <form id="addAttendee" onSubmit={this.handleSubmit}>
                <p><strong>Email: </strong><input name="email" /></p>
                <p><strong>Name: </strong><input name="name" /></p>
                <button type="submit">Add</button>
                </form>
                <ol type="1">
                    {this.props.userEvents.map( elem =>{
                        return (
                            <li key={elem.id}><strong>Email:</strong> {elem.user.email} // <strong>Name:</strong> {elem.user.name} // <strong>Attending:</strong> {elem.attending} // <strong>Arrived:</strong> {elem.arrived} // <button onClick={ () => this.props.deleteUserEvents(elem.id)}>X</button></li>
                    )})}
                </ol>
            </div>
        )
    }
    handleSubmit(ev){
        ev.preventDefault()
        axios.post('/api/userevents', {email: ev.target.email.value, name: ev.target.name.value, eventId: this.props.eventId})
        .then( () => this.props.loadUserEvents())
        .catch( (error) => console.log(error))
    ev.target.email.value = ''
    ev.target.name.value = ''
    }
}

const mapStateToProps = (state) => {
    let attendees = state.userEvents.filter( elem => elem.eventId === state.eventId)
    return { userEvents: attendees, eventId: state.eventId}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserEvents: () => {
            dispatch(_loadUserEvents())
        },
        deleteUserEvents: (id) => {
            dispatch(_deleteUserEvents(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUsers)
