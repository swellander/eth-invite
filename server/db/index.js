const connection = require('./connection');
const { User, Event, UserEvent } = require('./models');
const { users, events } = require('./seed');

//=======ASSOCIATIONS==============
Event.belongsTo(User);
Event.belongsToMany(User, { through: 'invite' });
User.belongsToMany(Event, { through: 'invite' });
UserEvent.belongsTo(User);

const syncAndSeed = async () => {
    await connection.sync({ force: true });
    const [kanye, bruce, lebron, constance, lex] = await Promise.all(users.map(user => User.create(user)));
    const [bday, christmas, thanksgiving] = await Promise.all(events.map(event => Event.create(event)));
    await kanye.addEvents(1, { through: { paid: true, attending: true, arrived: false } });
    await kanye.addEvents(1, { through: { attending: 'Yes', paid: true, arrived: 'No' } });
    console.log('db seeding complete!')
}

module.exports = {
    syncAndSeed
}