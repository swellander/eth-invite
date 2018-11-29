const connection = require('./connection');
const { User, Event, UserEvent } = require('./models');
const { users, events } = require('./seed');

//=======ASSOCIATIONS==============
Event.belongsTo(User, { as: 'organizer' });
// User.hasMany(Event, { as: 'organizer' })
Event.belongsToMany(User, { through: 'userevents' });
User.belongsToMany(Event, { through: 'userevents' });
UserEvent.belongsTo(User);
UserEvent.belongsTo(Event);

//===========SYNC/SEED=============
const syncAndSeed = async () => {
    await connection.sync({ force: true });
    const [kanye, bruce, lebron, constance, lex] = await Promise.all(users.map(user => User.create(user)));
    const [bday, christmas, thanksgiving] = await Promise.all(events.map(event => Event.create(event)));
    await kanye.addEvent(1, { through: { paid: true, attending: true, arrived: false } });
    await kanye.addEvent(1, { through: { attending: 'Yes', paid: true, arrived: 'No' } });
    console.log('db seeding complete!')
}

module.exports = {
    syncAndSeed
}