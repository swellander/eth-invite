import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux'

import { _loadInvites } from '../../store/invites'

class EventPending extends React.Component {
    render() {
        if (!this.props) {
            return null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        return (
            <div>
                <p><button onClick={() => console.log('add cam sign in later')}>Sign in with your face!</button></p>
                <form id="codeLogin" onSubmit={this.handleSubmit}>
                    <p><button type="submit">Sign in with code: </button> <input title="code" /></p>
                </form>
            </div>
        )
    }
    handleSubmit(ev) {
        ev.preventDefault()
        axios.put('/api/invites', { code: ev.target.code.value })
            .then(() => this.props.loadInvites())
            .catch((error) => console.log(error))
        ev.target.code.value = ''
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadInvites: () => {
            dispatch(_loadInvites())
        }
    }
}

export default connect(null, mapDispatchToProps)(EventPending)