import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {
          !this.props.data.loading ? (
            this.props.data.events.map(event => (
              <h3>{event.title}</h3>
            ))
          ) : ''
        }
      </div>
    )
  }
}

const query = gql`
query {
  events {
    id
    title
    stake
  }
}`;

export default graphql(query)(Dashboard);