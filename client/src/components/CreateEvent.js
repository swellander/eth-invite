import React, { Component } from 'react';
import { web3, deployEvent } from '../eth';
import EventForm from './EventForm';
import { _createEvent } from '../store/events';
import { connect } from 'react-redux';

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
    const newEvent = {
      ...event,
      stake,
      address,
      ownerAddress: account,
    }

    //make call to thunk
    this.props.createEvent(newEvent);

    //redirect to home
    this.props.history.push('/');
  }
  render() {
    if (this.state.loading) return <h3>Loading...</h3>
    return (
      <EventForm submitForm={this.handleSubmit} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: event => dispatch(_createEvent(event))
  }
}

export default connect(null, mapDispatchToProps)(Main);