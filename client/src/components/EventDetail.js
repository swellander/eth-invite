import React, { Component } from 'react';
import { rsvpEth } from '../eth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GuestList from './GuestList';
import InviteGuests from './InviteGuests';
import { _rsvp } from '../store/invites';

class EventDetail extends Component {
  rsvp = async decision => {
    //call rsvp method from currently logged in account

    const { rsvp, selectedInvite, selectedEvent } = this.props;
    const { address, stake } = selectedEvent;

    //if rsvp yes, make transaction to stake eth
    if (decision === 'YES') rsvpEth(address, stake);

    //else, just update db
    rsvp(selectedInvite, decision);

    //redirect to rsvp camera
    this.props.history.push('/rsvp');
  }
  render() {
    const { auth, selectedInvite, selectedEvent, eventId } = this.props;
    if (!selectedEvent) return <h3>Spinner...</h3>
    else {
      const { title, location, date, description, address, stake } = selectedEvent;

      //auth user id is a string
      const isOrganizer = +auth.user.id === selectedEvent.organizerId;
      console.log('userId', auth.user.id)
      console.log('organizerId', selectedEvent.organizerId)
      console.log('isOrganizer', isOrganizer);
      return (
        <div>
          {/* update status to deployed if event has an address */}
          <h1>{address ? 'Deployed' : 'Deploying'}</h1>
          <h1>{title}</h1>
          {selectedInvite && (
            <div>
              {/* TODO: only allow this to be clicked once */}
              <button onClick={() => this.rsvp('YES')}>ACCEPT</button>
              <button onClick={() => this.rsvp('NO')}>DECLINE</button>
            </div>
          )}
          <h3>{location}</h3>
          <h4>{date}</h4>
          <p>{description}</p>
          <p>{address}</p>
          <p>{stake} ETH</p>

          {isOrganizer && (
            <div>
              <h3>Invite Guests</h3>
              <InviteGuests />
            </div>
          )}

          <h3>Guests</h3>

          <GuestList eventId={eventId} />

        </div>
      )
    }
  }
}

const mapStateToProps = ({ events, invites, auth }, { match }) => {
  const eventId = +match.params.id; //coerce string id to an int to match with data returned from sequelize
  const selectedInvite = invites.find(invite => invite.event.id === eventId);
  const allEvents = events.concat(invites.map(invite => invite.event));
  const selectedEvent = allEvents.find(event => event.id === eventId);
  return {
    auth,
    selectedInvite,
    selectedEvent,
    eventId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rsvp: (invite, decision) => dispatch(_rsvp(invite, decision))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDetail));