import React, { Component } from 'react';
import { rsvpEth } from '../eth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GuestList from './GuestList';
import InviteGuests from './InviteGuests';
import { _rsvp } from '../store/invites';
import Header from './Header';


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
          <Header />
          <div style={{ width: '80vw', position: 'absolute', left: '10%', fontFamily: 'Andale Mono' }}>
            {/* update status to deployed if event has an address */}
            <h3 style={{ display: 'inline' }}><strong>{title}</strong></h3>
            <button style={{ marginRight: 73, float: 'right' }} className="btn btn-success" onClick={() => this.props.history.push(`/confirm/${selectedEvent.id}`)}>CONFIRM ATTENDACE</button>

            <hr />

            <div className="p-3 mb-2 bg-light text-dark" style={{ width: '75vw' }}><h6>{description}</h6></div>
            <h6><strong>Location: </strong>{location}</h6>
            <h6><strong>Date: </strong>{date}</h6>
            <h6><strong>Address: </strong>{address}</h6>
            <h6><strong>Stake: </strong>{stake} ETH</h6>
            <h6><strong>Status: </strong>{address ? 'Deployed' : 'Deploying'}</h6>
            {selectedInvite && (
              <div>
                {/* TODO: only allow this to be clicked once */}
                <button className="btn btn-primary" onClick={() => this.rsvp('YES')}>ACCEPT</button> <button className="btn btn-danger" onClick={() => this.rsvp('NO')}>DECLINE</button>
              </div>
            )}
            {isOrganizer && (
              <div>
                <p />
                <h5><strong>Invite Guests</strong></h5>
                <InviteGuests />
              </div>
            )}
            <p />
            <h5><strong>Guests</strong></h5>
            <GuestList eventId={eventId} />
          </div>
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