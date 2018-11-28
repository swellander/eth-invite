import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux'

import {_loadUserEvents} from '../../store/userevents'

class EventPending extends React.Component{
    render(){
        if (!this.props){
            return null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        return (
            <div>
                <p><button onClick={ ()=> console.log('add cam sign in later')}>Sign in with your face!</button></p>
                <form id="codeLogin" onSubmit={this.handleSubmit}>
                    <p><button type="submit">Sign in with code: </button> <input title="code" /></p>
                </form>
            </div>
        )
    }
    handleSubmit(ev){
        ev.preventDefault()
        axios.put('/api/userevents', {code: ev.target.code.value})
            .then( () => this.props.loadUserEvents())
            .catch( (error) => console.log(error))
        ev.target.code.value = ''
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserEvents: () => {
            dispatch(_loadUserEvents())
        }
    }
}

export default connect(null, mapDispatchToProps)(EventPending)