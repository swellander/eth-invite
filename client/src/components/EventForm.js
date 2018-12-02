import React, { Component } from 'react';
import LocationSearchInput from './LocationSearchInput';

export default class EventForm extends Component {
  state = {
    loading: false,
    title: '',
    location: '',
    date: '',
    description: '',
    stake: 0,
    lat: 0,
    lng: 0
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAddressSelect = ({ address, lat, lng }) => {
    this.setState({
      location: address,
      lat,
      lng
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.submitForm(this.state);
  }
  render() {
    return (
      <div style={{ width: '60vw', position: 'absolute', left: '20%', fontFamily: 'Andale Mono' }}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label><strong>Title</strong></label>
            <input
              onChange={this.handleChange}
              value={this.state.title}
              name="title"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label><strong>Location</strong></label>
            <LocationSearchInput selectAddress={this.handleAddressSelect} />
          </div>
          <div className="form-group">
            <label><strong>Date</strong></label>
            <input
              onChange={this.handleChange}
              value={this.state.date}
              name="date"
              type="date"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label><strong>Description</strong></label>
            <input
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label><strong>Stake</strong></label>
            <input
              onChange={this.handleChange}
              value={this.state.stake}
              name="stake"
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Create</button>
          </div>
        </form>
      </div>
    )
  }
}
