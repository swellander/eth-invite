import React from 'react'
import { web3, factory } from '../eth'

export default class Web3Container extends React.Component {
  state = { web3: null, accounts: null, factory: null };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts()
      this.setState({ web3, accounts, factory })
    } catch (error) {
      alert(
        `Need more precise error handling`
      )
      console.log(error)
    }
  }

  render() {
    const { web3, accounts, factory } = this.state
    return web3 && accounts
      //if both web3 and accounts were succesfully loaded and set on state, invoke and return render prop
      ? this.props.render({ web3, accounts, factory })
      //if not yet loaded, invoke and return renderLoading prop
      : this.props.renderLoading()
  }
}
