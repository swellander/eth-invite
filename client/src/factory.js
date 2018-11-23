import factoryJson from '../../ethereum/build/EventFactory.json';
import { web3 } from './util/web3';

const factory = new web3.eth.Contract(
  JSON.parse(factoryJson.interface),
  '0x5d185b3fc4cec1f571c35888bd2b1c4f6e10c734'
)

export default factory;