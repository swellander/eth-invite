import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { web3, deployEvent } from '../eth';
// import Spinner from './Spinnner';

class Main extends Component {
  state = {
    loading: false,
    title: '',
    location: '',
    date: '',
    description: '',
    stake: 0,
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    let { stake, date } = this.state;

    //convert stake from ETH to WEI 
    stake = (stake * 1e18) + '';
    //convert date to unix
    date = new Date(date).getTime();

    //TODO: Figure out a way to only fetch accounts once
    const [account] = await web3.eth.getAccounts();

    const address = await deployEvent(stake, date);
    const variables = {
      ...this.state,
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
      <div>
        <button onClick={this.test}>Test</button>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            onChange={this.handleChange}
            value={this.state.title}
            name="title"
            type="text"
          />

          <label>Location</label>
          <input
            onChange={this.handleChange}
            value={this.state.location}
            name="location"
            type="text"
          />

          <label>Date</label>
          <input
            onChange={this.handleChange}
            value={this.state.date}
            name="date"
            type="date"
          />

          <label>Description</label>
          <input
            onChange={this.handleChange}
            value={this.state.description}
            name="description"
            type="text"
          />

          <label>Stake</label>
          <input
            onChange={this.handleChange}
            value={this.state.stake}
            name="stake"
            type="number"
          />

          <button>Create</button>
        </form>
      </div>
    )
  }
}


//TODO: decide whether or not to keep $stake as type string
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