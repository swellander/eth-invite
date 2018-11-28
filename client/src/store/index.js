import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import events from './events'
import users from './users'
import userEvents from './userevents'
import eventId from './eventId'
import editMode from './editMode'
import auth from './auth';

const reducer = combineReducers({
    auth,
    events,
    users,
    userEvents,
    eventId,
    editMode
})

export default createStore(reducer, applyMiddleware(thunk, logger))