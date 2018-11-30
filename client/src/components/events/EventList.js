import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component {
    render() {
        const { isOrganizer, hostedEvents, invitedEvents } = this.props;
        const events = isOrganizer ? hostedEvents : invitedEvents
        return (
            <div>
                {events.map(event => {
                    return (
                        <div key={event.id} onClick={() => this.props.history.push(`/events/${event.id}`)}>
                            <p><strong>Name:</strong> {event.title}</p>
                            <p><strong>Time:</strong> {event.date}</p>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = ({ events, invites }) => {
    const invitedEvents = invites.map(invite => invite.event);
    return {
        hostedEvents: events,
        invitedEvents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadEvent: (id) => {
            dispatch({ type: 'LOAD_EVENT', id: id })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDescription));