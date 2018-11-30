import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

//=========reducers============
import invites from './invites'
import guests from './guests'
import eventId from './eventId'
import events from './events';
import editMode from './editMode'
import auth from './auth';

const reducer = combineReducers({
    auth,
    invites,
    guests,
    eventId,
    events,     //the events that the user is organizing
    editMode,
})

export default createStore(reducer, applyMiddleware(thunk, logger))