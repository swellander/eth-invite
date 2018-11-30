import React from 'react'
import { connect } from 'react-redux'

import EventList from './EventList'
import EventDescription from './EventDescription'
import Invites from './Invites'
import EventPending from './EventPending'

class Events extends React.Component {
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
                    <EventList events={this.props.events} />
                </div>
                <div className="col-8">
                    <h3><p><strong>Event Details</strong></p></h3>
                    <EventDescription />
                    <Invites />
                    <EventPending />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ eventId }) => ({ eventId });

export default connect(mapStateToProps)(Events)