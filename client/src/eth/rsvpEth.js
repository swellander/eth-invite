import web3 from './web3';
import Event from './Event';


export default async (address, stake) => {
  const stakeInWei = stake * 1e18;

  const accounts = await web3.eth.getAccounts();
  console.log('accounts', accounts)
  const event = await Event(address);
  await event.methods.rsvp().send({
    from: accounts[0],
    gas: '3000000',
    value: stakeInWei + '',
  });
  const invitees = await event.methods.getInvitees().call({
    from: accounts[0]
  });

  console.log(invitees);
}


