const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const eventPath = path.resolve(__dirname, 'contracts', 'Event.sol');
const source = fs.readFileSync(eventPath, 'utf8');

const { contracts } = solc.compile(source, 2);
const Event = contracts[":Event"];
const EventFactory = contracts[":EventFactory"];

module.exports = {
  Event,
  EventFactory
}

console.log(contracts);