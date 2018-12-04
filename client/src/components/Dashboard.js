import React, { Component } from 'react';
import { connect } from 'react-redux';
import Events from './events/Events';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import EventList from './events/EventList';
import { _loadInvites } from '../store/invites';
import { _loadEvents } from '../store/events';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, withStyles } from '@material-ui/core';

const styles = {
  container: {
    marginBottom: 20
  }
}

class Dashboard extends Component {
  state = {
    value: 0
  }
  componentDidMount() {
    // take this out later
    this.props.init(this.props.auth.user.id);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <Grid container justify="center">
          <Grid item xs={10} lg={6}>
            <Tabs
              className={classes.container}
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
            >
              <Tab style={{ fontFamily: 'Andale Mono' }} label="Events" />
              <Tab style={{ fontFamily: 'Andale Mono' }} label="Invites" />
            </Tabs>
            {value === 0 && <EventList isOrganizer={true} />}
            {value === 1 && <EventList isOrganizer={false} />}
            {/* <div className="container" style={{ fontFamily: 'Andale Mono' }}>
          <div className="row">
            <div className="col">
              <h5><strong>Your Events</strong></h5>
              <EventList isOrganizer={true} />
            </div>
            <div className="col">
              <h5><strong>Your Invites</strong></h5>
              <EventList isOrganizer={false} />
            </div>
          </div>
        </div> */}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, events, invites }) => {
  const invitedEvents = invites.map(invite => invite.event);
  return {
    auth,
    events,
    invitedEvents
  }
};

const mapDispatchToProps = (dispatch, state, thing) => {
  return {
    init: (userId) => {
      dispatch(_loadInvites(userId));
      dispatch(_loadEvents(userId));
    }
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));