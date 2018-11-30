import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import CamCapture from './CamCapture';
import CreateEvent from './CreateEvent';
import EventDetail from './EventDetail';
import Login from './Login';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { _loadInvites } from '../store/invites';
import { _loadEvents } from '../store/events';

class Main extends Component {
  componentDidMount() {
    this.props.init(this.props.auth.id);
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/camera" component={CamCapture} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/create_event" component={CreateEvent} />
          <Route path="/events/:id" component={EventDetail} />
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));