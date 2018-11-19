const { expect } = require('chai');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { Event } = require('../compile');
const { interface, bytecode } = Event;

let accounts, inbox;

describe('Event contract', () => {
  beforeEach(async () => {
    accounts = await new web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
  })
})
