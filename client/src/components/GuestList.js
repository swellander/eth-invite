import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _loadGuests } from '../store/guests';

class GuestList extends Component {
  componentDidMount() {
    const { loadGuests, eventId } = this.props;
    loadGuests(eventId);
  }
  getYesGuests = guests => guests.filter(guest => guest.attending === 'YES' && !guest.arrived).map(guest => guest.user);
  getNoGuests = guests => guests.filter(guest => guest.attending === 'NO').map(guest => guest.user);
  getArrivedGuests = guests => guests.filter(guest => guest.arrived).map(guest => guest.user);

  render() {
    const { guests } = this.props;

    if (!guests) return <h3>Spinner...</h3>
    else {
      const yesGuests = this.getYesGuests(guests);
      const noGuests = this.getNoGuests(guests);
      const arrivedGuests = this.getArrivedGuests(guests);
      return (
        <div>
          <h3>All Invited Guests</h3>
          {
            guests.map(guest => {            //variable "guests" refers to invite objects where as "yesGuests",
              return (                       //"noGuests", and "arrivedGuests" refer to user objects
                <p>{guest.user.name}</p>     //TODO: fix this amgiguity
              )
            })
          }
          <hr></hr>
          <h3>Attending</h3>
          {
            yesGuests.map(guest => {
              return (
                <p>{guest.name}</p>
              )
            })
          }
          <hr></hr>
          <h3>Not Attending</h3>
          {
            noGuests.map(guest => {
              return (
                <p>{guest.name}</p>
              )
            })
          }
          <hr></hr>
          <h3>Arrived</h3>
          {
            arrivedGuests.map(guest => {
              return (
                <p>{guest.name}</p>
              )
            })
          }
        </div>
      )
    }
  }
}

const mapStateToProps = ({ guests }) => ({ guests })
const mapDispatchToProps = dispatch => ({
  loadGuests: eventId => dispatch(_loadGuests(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestList);