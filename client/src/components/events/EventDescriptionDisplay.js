import React from 'react'
import { connect } from 'react-redux'

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component {
    render() {
        if (!this.props.singleEvent) {
            return null
        }
        return (
            <div>
                <p><strong>Title:</strong> {this.props.singleEvent.title}</p>
                <p><strong>Description:</strong>  {this.props.singleEvent.description}</p>
                <p><strong>Place:</strong>  {this.props.singleEvent.location}</p>
                <p><strong>Time:</strong>  {this.props.singleEvent.date}</p>
                <p><strong>Buy-In:</strong>  {this.props.singleEvent.stake}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let singleEvent = state.events.filter(elem => elem.id === state.eventId)
    return { singleEvent: singleEvent[0] }
}

export default connect(mapStateToProps)(EventDescription)