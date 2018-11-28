import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined') {
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider)
  } else {
    alert('Please log into MetaMask and reload page')
  }
} else {
  console.log('not in browser')
}

export default web3;
