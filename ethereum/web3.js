import Web3 from 'web3';
import { Connect } from 'uport-connect';

const uport = new Connect('Eth-Invite');
const provider = uport.getProvider();

const web3 = new Web3(provider);

// let web3;

// if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
//   //code is being executed in the browser and metamask is running
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   //code is being executed on the server OR user is not running metamask
//   const provider = new Web3.providers.HttpProvider(
//     'https://ropsten.infura.io/v3/c5c86da7f24642ae9aa2aca44eaceb31'
//   );
//   web3 = new Web3(provider);
// }

export default web3;