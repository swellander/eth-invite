import factory from './factory';
import web3 from './web3';

export default async (stake, date) => {
  //convert contract method arguments to strings TODO: look up why this is necessary
  // const formattedDate = date + '';

  // //TODO: Figure out a way to only fetch accounts once
  // const [account] = await web3.eth.getAccounts();

  // try {
  //   //deploy event contract from within factory
  //   await factory.methods.createEvent(stake, formattedDate)
  //     .send({
  //       from: account,
  //       gas: '1000000'
  //     });
  // } catch (ex) {
  //   console.log('Something went wrong deploying the new event contract');
  //   console.log(ex);
  // }

  // //once new event contract is deployed, retrieve all event addresses deployed by the current user
  // const events = await factory.methods.getDeployedEvents().call({
  //   from: account
  // });

  // //TODO: find a cleaner way to get new address back from original deploy send
  // //return the address of the newly deployed contract
  // return events[events.length - 1];


  return '0x62f4fb70BFc5293fCC5036755354BC77967f2699';
};