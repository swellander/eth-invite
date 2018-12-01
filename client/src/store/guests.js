import axios from 'axios'

//action consonants
const LOAD_GUESTS = 'LOAD_GUESTS'

//action creator
const loadGuests = (guests) => {
    return {
        type: LOAD_GUESTS,
        guests
    }
}

//thunk creator
export const _loadGuests = (id) => {
    console.log('Loading Guests for eventId', id);
    return (dispatch) => {
        axios.get(`/api/invites/events/${id}`)
            .then((res) => res.data)
            .then((users) => dispatch(loadGuests(users)))
    }
}
export const _inviteGuests = (guestArr, eventId) => {
    console.log('guestArr', guestArr);
    return (dispatch) => {
        axios.post(`/api/invites`, { guests: guestArr, eventId })
            .then(() => dispatch(_loadGuests(eventId)))
    }
}


//users reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_GUESTS:
            return action.guests
        default:
            return state
    }
}