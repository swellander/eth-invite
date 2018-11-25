import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
  handleSubmit = e => {
    e.preventDefault();

    const variables = {
      ...this.state,
      address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      ownerAddress: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
    }
    this.props.mutate({
      variables
    })

    // this.props.history.push('/')
  }
  render() {
    console.log(this.props)
    return (
      <div>
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