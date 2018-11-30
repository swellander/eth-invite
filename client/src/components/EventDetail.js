import React, { Component } from 'react';
import { web3, Event } from '../eth';

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
    const variables = {
      id: this.props.match.params.id
    }
    return (
      <Query query={query} variables={variables}>
        {
          ({ loading, error, data }) => {
            if (loading) return <h3>Spinner..</h3>
            if (error) return <h3>Error: {error}</h3>
            const { event } = data;
            const { title, location, date, description, address, stake, guests } = event;
            if (!event) return <h3>No event with that ID</h3>
            return (
              <div>
                <h1>{title}</h1>
                <h3>{location}</h3>
                <h4>{date}</h4>
                <p>{description}</p>
                <p>{address}</p>
                <p>{stake} ETH</p>

                <h3>Guests</h3>
                <ul>
                  {guests.map(guest => <li key={guest.id}>{guest.name}</li>)}
                </ul>

                <button onClick={() => this.rsvp(address, stake)}>RSVP</button>
              </div>
            )
          }
        }

      </Query>
    )
  }
}

export default EventDetail;