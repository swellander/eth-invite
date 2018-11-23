import React, { Component } from 'react';
import { web3 } from '../util/web3';
import factory from '../factory';
class App extends Component {
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    alert(accounts);
    // if (accounts.length == 0) alert('Not logged into metamask')

    // const receipt = await factory.methods.createEvent('1000000000000000000', '1542923676453')
    //   .send({
    //     from: accounts[0],
    //     gas: '1000000',
    //   });

    // console.log('receipt', receipt);

    //from account must be specified. Unless default account is set? 
    // const events = await factory.methods.getDeployedEvents().call({
    //   from: accounts[0]
    // });
    // console.log('Events:', events)


  }

  render() {
    return (
      <h1>App component</h1>
    )
  }
}

export default App;