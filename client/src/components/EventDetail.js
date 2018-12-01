import React, { Component } from 'react';
import { rsvpEth, web3, Event } from '../eth';
import { connect } from 'react-redux';
import GuestList from './GuestList';
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
  }
  render() {
    const { selectedInvite, selectedEvent, eventId } = this.props;
    if (!selectedEvent) return <h3>Spinner...</h3>
    else {
      const { title, location, date, description, address, stake } = selectedEvent;
      const isDisabled = selectedInvite.attending == 'UNDECIDED' ? false : true;
      return (
        <div>
          <h1>{title}</h1>
          {selectedInvite && (
            <div>
              {/* TODO: only allow this to be clicked once */}
              <button disabled={isDisabled} onClick={() => this.rsvp('YES')}>ACCEPT</button>
              <button onClick={() => this.rsvp('NO')}>DECLINE</button>
            </div>
          )}
          <h3>{location}</h3>
          <h4>{date}</h4>
          <p>{description}</p>
          <p>{address}</p>
          <p>{stake} ETH</p>

          <h3>Guests</h3>

          <GuestList eventId={eventId} />

        </div>
      )
    }
  }
}

const mapStateToProps = ({ events, invites }, { match }) => {
  const eventId = +match.params.id; //coerce string id to an int to match with data returned from sequelize
  const selectedInvite = invites.find(invite => invite.event.id === eventId);
  const allEvents = events.concat(invites.map(invite => invite.event));
  const selectedEvent = allEvents.find(event => event.id === eventId);
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);