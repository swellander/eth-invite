const { expect } = require('chai');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/EventFactory.json');
const compiledEvent = require('../ethereum/build/Event.json');

let accounts, factory, event, eventAddress;

describe('Event contract', () => {
  beforeEach(async () => {
    accounts = await new web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({ from: accounts[0], gas: '1000000' })

    await factory.methods.createEvent('1000000000000000000', '1542651986')
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    [eventAddress] = await factory.methods.getDeployedEvents().call();

    //create js object representation of the deployed contract
    event = await new web3.eth.Contract(
      JSON.parse(compiledEvent.interface),
      eventAddress
    );
  });
  it('deploys factory and event', () => {
    expect(factory.options.address).to.be.ok;
    expect(event.options.address).to.be.ok;
  });
  it('an account can rsvp to an event', async () => {
    await event.methods.rsvp()
      .send({
        from: accounts[0],
        gas: '1000000',
        value: '1000000000000000000'
      })
    const invitees = await event.methods.getInvitees().call();
    expect(invitees.includes(accounts[0])).to.be.true;
  });
  it('an account can only rsvp once', async () => {
    await event.methods.rsvp()
      .send({
        from: accounts[0],
        gas: '1000000',
        value: '1000000000000000000'
      })
    event.methods.rsvp()
      .send({
        from: accounts[0],
        gas: '1000000',
        value: '1000000000000000000'
      })
      .then(thing => console.log(thing))
      .catch(err => console.log(err))
  })
});


