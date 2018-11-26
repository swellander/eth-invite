import React, { Component } from 'react';

export default class EventForm extends Component {
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.submitForm(this.state);
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