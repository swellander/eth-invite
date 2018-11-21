import { web3 } from './web3';
import factoryContractJson from '../../../ethereum/build/EventFactory.json';
const factoryABI = JSON.parse(factoryContractJson.interface);
const factoryAddress = process.env.FACTORY_ADDRESS || '0x23106DFF686996e9b7da439f110d50D89632af06';

const factoryContractInstance = new web3.eth.Contract(factoryABI, factoryAddress);

export default factoryContractInstance;



