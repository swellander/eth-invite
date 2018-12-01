import factory from './factory';
import web3 from './web3';

export default async (stake, date) => {
  // convert contract method arguments to strings TODO: look up why this is necessary
  const formattedDate = date + '';
  const stakeInWei = (stake * 1e18) + '';

  //TODO: Figure out a way to only fetch accounts once
  const [account] = await web3.eth.getAccounts();

  try {
    //deploy event contract from within factory
    await factory.methods.createEvent(stakeInWei, formattedDate)
      .send({
        from: account,
        gas: '1000000'
      });
  } catch (ex) {
    console.log('Something went wrong deploying the new event contract');
    console.log(ex);
  }

  //once new event contract is deployed, retrieve all event addresses deployed by the current user

  // let events = [];
  // while (events.length === 0 ) {
  const events = await factory.methods.getDeployedEvents().call({
    from: account
  });

  console.log("events", typeof events, events)
  // }

  //TODO: find a cleaner way to get new address back from original deploy send
  //return the address of the newly deployed contract
  const newEventAddress = events[events.length - 1];
  console.log('new event address', newEventAddress);

  return newEventAddress;
};