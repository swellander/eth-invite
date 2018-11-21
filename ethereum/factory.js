import web3 from './web3';
import compiledEventFactory from './build/EventFactory.json';

//create instance of EventFactory contract
const instance = new web3.eth.Contract(
  JSON.parse(compiledEventFactory.interface),
  '0x23106DFF686996e9b7da439f110d50D89632af06'
);

export default instance;