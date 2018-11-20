const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');

//delete everything inside of build directory
fs.removeSync(buildPath);

const eventPath = path.resolve(__dirname, 'contracts', 'Event.sol');
const source = fs.readFileSync(eventPath, 'utf8');

console.log('Compiling source code')
const { contracts } = solc.compile(source, 1);
console.log('Finished compiling')

console.log(contracts)

//make sure that build dir exists, create it if not
fs.ensureDirSync(buildPath);

//write contracts to new files in build folder
for (let contract in contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.slice(1) + '.json'),
    contracts[contract]
  );
}
