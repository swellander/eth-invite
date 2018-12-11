import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { _inviteGuests } from '../store/guests';
import { Grid } from '@material-ui/core';

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
        <div className="">
          <div className="">
            <form onSubmit={this.handleSubmit} >
              <Grid container>
                <Grid item xs={9}>
                  <Select
                    style={{ width: '100px' }}
                    name="guests"
                    value={this.state.guests}
                    onChange={this.handleChange}
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    isMulti
                    options={this.options}
                  />
                </Grid>
                <Grid item xs={3}>
                  <button type="submit" onClick={this.handleSubmit} style={{ marginLeft: 10, }} className="btn btn-primary">INVITE</button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
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