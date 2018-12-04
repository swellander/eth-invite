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
          <h6><strong>All Invited Guests</strong></h6>
          {
            guests.map(guest => {            //variable "guests" refers to invite objects where as "yesGuests",
              return (                       //"noGuests", and "arrivedGuests" refer to user objects
                <p>{guest.user.name}</p>     //TODO: fix this amgiguity
              )
            })
          }
          <hr></hr>
          <h6><strong>Attending</strong></h6>
          {
            yesGuests.map(guest => {
              return (
                <p>{guest.name}</p>
              )
            })
          }
          <hr></hr>
          <h6><strong>Not Attending</strong></h6>
          {
            noGuests.map(guest => {
              return (
                <p>{guest.name}</p>
              )
            })
          }
          <hr></hr>
          <h6><strong>Arrived</strong></h6>
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