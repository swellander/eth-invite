import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { web3, factory } from '../eth';

class Main extends Component {
  state = {
    title: '',
    location: '',
    date: '',
    description: '',
    stake: 0,
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  test = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);

    const events = await factory.methods.getDeployedEvents().call({
      from: accounts[0]
    })

    console.log("Events", events);
  }

  handleSubmit = async e => {
    e.preventDefault();

    //call factory contract and deploy event 
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);
    let address;
    let { stake, date } = this.state;
    stake = stake + '';
    date = new Date(date).getTime();
    console.log(typeof stake)
    console.log(typeof date, date)
    try {
      await factory.methods.createEvent(stake + '', date + '')
        .send({
          from: accounts[0],
          gas: '1000000'
        }, (err, receipt) => console.log(err, receipt));
      const events = await factory.methods.getDeployedEvents().call({
        from: accounts[0]
      });

      address = events[events.length - 1];
    } catch (ex) {
      throw ex;
    }
    //graphql

    const variables = {
      ...this.state,
      address,
      ownerAddress: accounts[0],
    }

    this.props.mutate({ variables })
      .then(({ data }) => {
        const { id } = data.addEvent;
        this.props.history.push(`/events/${id}`)
      })


  }
  render() {
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