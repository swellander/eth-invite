import React from 'react'
import { connect } from 'react-redux'

import EventDescriptionDisplay from './EventDescriptionDisplay'
import EventDescriptionEdit from './EventDescriptionEdit'

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component{
    render(){
        if (!this.props.events){
            return null
        }
        if (!this.props.editMode){
            return (
                <div>
                    <EventDescriptionDisplay />
                    <button onClick={ () => this.props.toggleEdit(true)}>Edit</button>
                    <hr />
                </div>
            )
        }
        return (
            <div>
                <EventDescriptionEdit />
                <button onClick={ () => this.props.toggleEdit(false)}>Cancel</button>
                <hr />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let singleEvent = state.events.filter( elem => elem.id === state.eventId)
    return {
        events: singleEvent,
        editMode: state.editMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleEdit: (bool) => {
            dispatch({type: 'TOGGLE_EDIT_MODE', editMode: bool})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDescription)