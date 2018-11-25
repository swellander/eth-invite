import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Header from './Header';
import Dashboard from './Dashboard';
import CreateEventForm from './CreateEventForm';
import EventDetail from './EventDetail';

class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/create_event" component={CreateEventForm} />
          <Route path="/events/:id" component={EventDetail} />
        </Switch>
      </div>
    )
  }
}

const query = gql`
  query {
    events {
      id
      title
      address
      stake
      guests {
        id
      }
    }
  }
`;

export default graphql(query)(Main);