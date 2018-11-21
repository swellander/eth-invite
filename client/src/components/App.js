import React, { Component } from 'react';
import factoryContractInstance from '../util/factoryContract';
import web3 from '../util/web3';

class App extends Component {
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    console.log(factoryContractInstance)
    const events = await factoryContractInstance.methods.getDeployedEvents().call();
    console.log(events);
  }

  render() {
    return (
      <h1>App component</h1>
    )
  }
}

export default App;