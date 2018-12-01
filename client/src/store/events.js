import axios from 'axios'

export const _createEvent = (newEvent, userId) => async dispatch => {
  const response = await axios.post('api/events', newEvent)
  const createdEvent = response.data;
  dispatch(_loadEvents(userId))
  return createdEvent;
}

export const _setEventAddress = (address, eventId, userId) => dispatch => {
  return axios.put(`/api/events/${eventId}`, { address })
    .then(() => dispatch(_loadEvents(userId)))
}

//action consonants
const LOAD_EVENTS = 'LOAD_EVENTS'

const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    events
  }
}

export const _loadEvents = (userId) => {
  return (dispatch) => {
    axios.get(`/api/events/${userId}`)
      .then((res) => res.data)
      .then((events) => dispatch(loadEvents(events)))
  }
}

//invites reducer
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return action.events
    default:
      return state
  }
}