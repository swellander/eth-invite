import axios from 'axios'

//action consonants
const LOAD_EVENTS = 'LOAD_EVENTS'

const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        events
    }
}

//thunk creator
// export const _editEvent = editedEvent => {
//     return dispatch => {
//         axios.put('/api/')
//     }
// }
export const _loadEvents = (userId) => {
    return (dispatch) => {
        axios.get(`/api/events/${userId}`)
            .then((res) => res.data)
            .then((events) => dispatch(loadEvents(events)))
    }
}
export const _createEvent = newEvent => dispatch => {
    return axios.post('api/events', newEvent)
        .then(response => response.data)
        .then(() => dispatch(_loadEvents()))
        .catch(err => console.log(err))
}

//events reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            return action.events
        default:
            return state
    }
}