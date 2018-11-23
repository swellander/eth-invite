import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider)
} else {
  console.log('not in browser')
}

export { web3 };
