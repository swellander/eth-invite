import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

class EventDetail extends Component {
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
                <p>{stake}</p>

                <h3>Guests</h3>
                <ul>
                  {guests.map(guest => <li key={guest.id}>{guest.name}</li>)}
                </ul>

              </div>
            )
          }
        }

      </Query>
    )
  }
}


const query = gql`
  query GetEvent($id: ID) {
          event(id: $id) {
          title
      location
        date
        description
        address
        stake
      guests {
          id
        name
        }
      }
    }
  `;

export default graphql(query)(EventDetail);