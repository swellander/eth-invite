import Web3 from 'web3';
import { Connect } from 'uport-connect';

const uportConnect = new Connect('Eth-Invite', { network: 'rinkeby', accountType: 'keypair' });

const provider = uportConnect.getProvider(); //TODO: get more clarification for what exactly the provider does.
// const web3 = new Web3(provider);

let web3 = new Web3(window.web3.currentProvider);


export { web3, uportConnect };
