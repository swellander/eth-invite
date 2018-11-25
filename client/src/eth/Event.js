//filename Event is capitalized not because it is a literal js constructor, but because it generates new event contract web3 instances

import factoryJson from '../../../ethereum/build/EventFactory.json';
import web3 from './web3';

export default address => {
  return new web3.eth.Contract(
    JSON.parse(factoryJson.interface),
    address
  )
}