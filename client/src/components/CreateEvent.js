import React, { Component } from 'react';
import { web3, deployEvent } from '../eth';
import EventForm from './EventForm';
import Header from './Header';
import { _createEvent, _setEventAddress } from '../store/events';
import { connect } from 'react-redux';

class Main extends Component {
  state = {
    loading: false
  }
  handleSubmit = async event => {
    this.setState({ loading: true });

    //TODO: Clean up this handle submit, maybe abstract to util functions

    let { stake, date } = event;

    //convert date to unix
    date = new Date(date).getTime() / 1000;

    //TODO: Figure out a way to only fetch accounts once
    const [account] = await web3.eth.getAccounts();
    console.log('account', account);

    const newEvent = {
      ...event,
      stake,
      organizerId: this.props.auth.user.id,
      ownerAddress: account,
    }

    const createdEvent = await this.props.createEvent(newEvent, this.props.auth.user.id);

    //redirect to dashboard
    this.props.history.push(`/events/${createdEvent.id}`);

    const address = await deployEvent(stake, date);
    console.log('ADDRESS is', address);
    this.props.setEventAddress(address, createdEvent.id, this.props.auth.user.id);
  }
  render() {
    if (this.state.loading) return <h3>Loading...</h3>
    return (
      <div>
        <Header />
        <EventForm submitForm={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => {
  return {
    setEventAddress: (address, eventId, userId) => dispatch(_setEventAddress(address, eventId, userId)),
    createEvent: (event, userId) => dispatch(_createEvent(event, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);