import axios from 'axios'

//action consonants
const LOAD_USERS = 'LOAD_USERS'

//action creator
const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

//thunk creator
export const _loadUsers = () => {
    return (dispatch)=> {
        axios.get('/api/users')
            .then( (res) => res.data )
            .then( (users) => dispatch(loadUsers(users)))
    }
}

//users reducer
export default (state = [], action) => {
    switch (action.type){
        case LOAD_USERS:
            return action.users
        default:
            return state
    }
}