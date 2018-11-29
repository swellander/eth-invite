import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

//=========reducers============
import invites from './invites'
import users from './users'
import eventId from './eventId'
import events from './events';
import editMode from './editMode'
import auth from './auth';

const reducer = combineReducers({
    auth,
    invites,    //the users invitations
    users,
    eventId,
    events,     //the events that the user is organizing
    editMode,
})

export default createStore(reducer, applyMiddleware(thunk, logger))