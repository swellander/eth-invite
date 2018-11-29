import React from 'react'
import { connect } from 'react-redux'

import { _loadEvents } from '../../store/events'
import { _loadUsers } from '../../store/users'
import { _loadUserEvents } from '../../store/userevents'

import EventList from './EventList'
import EventDescription from './EventDescription'
import EventUsers from './EventUsers'
import EventPending from './EventPending'

class Events extends React.Component {
    componentDidMount() {
        console.log('STATE', this.props.auth)
        this.props.init()
    }
    render() {
        if (!this.props.events) {
            return null
        }
        if (!this.props.eventId) {
            return (
                <div className="row">
                    <div className="col-4">
                        <h3><p><strong>Your Events</strong></p></h3>
                        <EventList />
                    </div>
                    <div className="col-8">
                        <h3><p><strong>Event Details</strong></p></h3>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col-4">
                    <h3><p><strong>Your Events</strong></p></h3>
                    <EventList />
                </div>
                <div className="col-8">
                    <h3><p><strong>Event Details</strong></p></h3>
                    <EventDescription />
                    <EventUsers />
                    <EventPending />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        init: (userId) => {
            dispatch(_loadEvents(userId))
            dispatch(_loadUsers())
            dispatch(_loadUserEvents())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
