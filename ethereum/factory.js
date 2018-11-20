import web3 from './web3';
import compiledEventFactory from './build/EventFactory.json';

//create instance of EventFactory contract
const instance = new web3.eth.Contract(
  JSON.parse(compiledEventFactory.interface),
  '0xec5D368F23D00c8ecF2cA148b71040A927c118B9'
);

export default instance;