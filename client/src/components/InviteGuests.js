import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { _inviteGuests } from '../store/guests';

class InviteGuests extends Component {
  state = {
    guests: []
  }
  options = []
  handleSubmit = e => {
    e.preventDefault();
    const eventId = this.props.match.params.id;
    console.log('eventId', eventId)
    this.props.inviteGuests(this.state.guests, eventId)
    this.setState({ guests: [] })
  }
  handleChange = e => {
    this.setState({ guests: e })
  }
  render() {
    const { connections } = this.props;
    if (connections) this.options = connections.map(conn => ({
      value: conn.email,
      label: conn.name
    }))
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Select
            name="guests"
            value={this.state.guests}
            onChange={this.handleChange}
            closeMenuOnSelect={false}
            components={makeAnimated()}
            isMulti
            options={this.options}
          />
          <button>INVITE</button>
        </form>
      </div>

    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    connections: auth.connections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inviteGuests: (guests, eventId) => dispatch(_inviteGuests(guests, eventId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InviteGuests));