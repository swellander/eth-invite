const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { interface, bytecode } = require('./build/EventFactory.json');
const provider = new HDWalletProvider(
  'shiver rule frost boy draw true educate monkey happy day address cradle',
  'https://rinkeby.infura.io/v3/693d47407aae4855a87aba5c28cb5f30'
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy to Ropsten network from account ${accounts[0]}`)
    const inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: '0x' + bytecode, arguments: ['First Message! Welcome!'] })
      .send({ from: accounts[0], gas: '1000000' });

    console.log(`Contract successfully deployed to ${inbox.options.address}`);
    process.env.FACTORY_ADDRESS = inbox.options.address;
    console.log('ABI:', interface);
  } catch (err) {
    console.log(err);
  }
}

deploy();