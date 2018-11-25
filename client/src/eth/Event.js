//filename Event is capitalized not because it is a literal js constructor, but because it generates new event contract web3 instances

import eventJson from '../../../ethereum/build/Event.json';
import web3 from './web3';

export default address => {
  return new web3.eth.Contract(
    JSON.parse(eventJson.interface),
    address
  )
}