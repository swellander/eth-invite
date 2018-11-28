import axios from 'axios'

//action consonants
const LOAD_USEREVENTS = 'LOAD_USER EVENTS'

//action creator
const loadUserEvents = (userEvents) =>{
    return {
        type: LOAD_USEREVENTS,
        userEvents
    }
}

//thunk creators
export const _loadUserEvents = () => {
    return (dispatch) => {
        axios.get('/api/userevents')
            .then( (res) => res.data )
            .then( (userEvents) => dispatch(loadUserEvents(userEvents)))
    }
}

export const _deleteUserEvents = (id) => {
    return (dispatch) => {
        axios.delete(`/api/userevents/${id}`)
            .then( () => axios.get('/api/userevents') )
            .then( (res) => res.data )
            .then( (userEvents) => dispatch(loadUserEvents(userEvents)))
            //.then( (userEvents) => dispatch(loadUserEvents(userEvents)))
    }
}

//userevents reducer
const userEventsReducer = (state = [], action) => {
    switch (action.type){
        case LOAD_USEREVENTS:
            return action.userEvents
        default:
            return state
    }
}

export default userEventsReducer