import factoryJson from '../../../ethereum/build/EventFactory.json';
import web3 from './web3';
const factoryAddress = process.env.FACTORY_ADDRESS || '0x9F04c9054B46e5e0cA1a9Aa67255a9f608AE5184';

const factory = new web3.eth.Contract(
  JSON.parse(factoryJson.interface),
  factoryAddress
)

export default factory;