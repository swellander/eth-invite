import axios from 'axios'
import { _loadGuests } from './guests';

//action consonants
const LOAD_INVITES = 'LOAD_INVITES'

const loadInvites = (invites) => {
    return {
        type: LOAD_INVITES,
        invites
    }
}

export const _loadInvites = (id) => {
    return (dispatch) => {
        axios.get(`/api/invites/users/${id}`)
            .then((res) => res.data)
            .then((invites) => dispatch(loadInvites(invites)))
    }
}

export const _rsvp = (invite, decision) => {
    return (dispatch) => {
        const update = {
            attending: decision || 'UNDECIDED'
        }
        return axios.put(`/api/invites/${invite.id}`, update)
            .then(() => dispatch(_loadGuests(invite.event.id)))
    }
}

export const _updateConfirmationStatus = (faceId, eventId) => {
    return (dispatch) => {
        const update = {
            faceId,
            eventId
        }
        return axios.put(`/api/invites/events`, update)
            .then(() => dispatch(_loadGuests(eventId)))
            .catch(err => console.log('WHOOOOOOOOPS', err))
    }
}

export const _deleteInvite = (id) => {
    return (dispatch) => {
        axios.delete(`/api/invites/${id}`)
            .then(() => dispatch(_loadInvites()))
    }
}

//invites reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_INVITES:
            return action.invites
        default:
            return state
    }
}