import React, { Component } from 'react';
import { web3, Event } from '../eth';
import { connect } from 'react-redux';
import GuestList from './GuestList';

class EventDetail extends Component {
  rsvp = async (address, stake) => {
    //call rsvp method from currently logged in account
    const accounts = await web3.eth.getAccounts();

    const event = Event(address);
    await event.methods.rsvp().send({
      from: accounts[0],
      gas: '1000000',
      value: stake + '',
    });
    const invitees = await event.methods.getInvitees().call({
      from: accounts[0]
    })

    console.log('Invitees', invitees);
  }
  render() {
    const { selectedEvent, eventId } = this.props;
    if (!selectedEvent) return <h3>Spinner...</h3>
    else {
      const { title, location, date, description, address, stake, guests } = selectedEvent;
      return (
        <div>
          <h1>{title}</h1>
          <h3>{location}</h3>
          <h4>{date}</h4>
          <p>{description}</p>
          <p>{address}</p>
          <p>{stake} ETH</p>

          <h3>Guests</h3>
          <GuestList eventId={eventId} />
          <button onClick={() => this.rsvp(address, stake)}>RSVP</button>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ events, invites }, { match }) => {
  const eventId = +match.params.id; //coerce string id to an int to match with data returned from sequelize
  const allEvents = events.concat(invites.map(invite => invite.event));
  const selectedEvent = allEvents.find(event => event.id === eventId);
  return {
    selectedEvent,
    eventId
  }
}

export default connect(mapStateToProps)(EventDetail);