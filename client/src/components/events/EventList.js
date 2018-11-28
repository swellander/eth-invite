import React from 'react'
import { connect } from 'react-redux'

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component {
    render() {
        if (!this.props.events) {
            return null
        }
        return (
            <div>
                {this.props.events.map(event => {
                    return (
                        <div key={event.id} onClick={() => this.props.loadEvent(event.id)}>
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

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadEvent: (id) => {
            dispatch({ type: 'LOAD_EVENT', id: id })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDescription)