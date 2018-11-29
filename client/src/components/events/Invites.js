import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import {_loadInvites, _deleteInvite} from '../../store/invites'

// eslint-disable-next-line react/prefer-stateless-function
class Invites extends React.Component{
    render(){
        if (!this.props.invites){
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
                    {this.props.invites.map( invite =>{
                        return (
                            <li key={invite.id}><strong>Email:</strong> {invite.user.email} // <strong>Name:</strong> {invite.user.name} // <strong>Attending:</strong> {invite.attending} // <strong>Arrived:</strong> {invite.arrived} // <button onClick={ () => this.props.deleteInvite(invite.id)}>X</button></li>
                    )})}
                </ol>
            </div>
        )
    }
    handleSubmit(ev){
        ev.preventDefault()
        axios.post('/api/invites', {email: ev.target.email.value, name: ev.target.name.value, eventId: this.props.eventId})
        .then( () => this.props.loadInvites())
        .catch( (error) => console.log(error))
    ev.target.email.value = ''
    ev.target.name.value = ''
    }
}

const mapStateToProps = (state) => {
    let attendees = state.invites.filter( invite => invite.eventId === state.eventId)
    return { invites: attendees, eventId: state.eventId}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadInvites: () => {
            dispatch(_loadInvites())
        },
        deleteInvite: (id) => {
            dispatch(_deleteInvite(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invites)
