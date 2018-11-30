import factoryJson from '../../../ethereum/build/EventFactory.json';
import web3 from './web3';
const factoryAddress = process.env.FACTORY_ADDRESS || '0xd85cdeec994a1904895b0dd4b034983226a642c5';

const factory = new web3.eth.Contract(
  JSON.parse(factoryJson.interface),
  factoryAddress
)

export default factory;