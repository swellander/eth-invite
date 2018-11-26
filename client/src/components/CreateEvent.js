import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { web3, deployEvent } from '../eth';
import EventForm from './EventForm';
// import Spinner from './Spinnner';

class Main extends Component {
  state = {
    loading: false
  }
  handleSubmit = async event => {
    this.setState({ loading: true });

    let { stake, date } = event;

    //convert stake from ETH to WEI 
    stake = (stake * 1e18) + '';
    //convert date to unix
    date = new Date(date).getTime();

    //TODO: Figure out a way to only fetch accounts once
    const [account] = await web3.eth.getAccounts();

    const address = await deployEvent(stake, date);
    const variables = {
      ...event,
      stake,
      address,
      ownerAddress: account,
    }
    this.props.mutate({ variables })
      .then(({ data }) => {
        const { id } = data.addEvent;
        this.props.history.push(`/events/${id}`)
      })
  }
  render() {
    if (this.state.loading) return <h3>Loading...</h3>
    return (
      <EventForm submitForm={this.handleSubmit} />
    )
  }
}

//TODO: decide whether or not to keep  $stake as type string
const mutation = gql`
  mutation AddEvent(
    $title: String
    $location: String
    $date: String
    $description: String
    $stake: String 
    $address: String
    $ownerAddress: String
  ) {
    addEvent(
      title: $title
      location: $location
      address: $address
      ownerAddress: $ownerAddress
      date: $date
      description: $description
      stake: $stake
    ) {
      id
    }
  }
`;

export default graphql(mutation)(Main);