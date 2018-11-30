const connection = require('./connection');
const { User, Event, Invite } = require('./models');
const { users, events } = require('./seed');

//=======ASSOCIATIONS==============
Event.belongsTo(User, { as: 'organizer' });
// User.hasMany(Event, { as: 'organizer' })
Event.belongsToMany(User, { through: 'invites' });
User.belongsToMany(Event, { through: 'invites' });
Invite.belongsTo(User);
Invite.belongsTo(Event);

//===========SYNC/SEED=============
const syncAndSeed = async () => {
    await connection.sync({ force: true });
    const [kanye, bruce, lebron, constance, lex] = await Promise.all(users.map(user => User.create(user)));
    const [bday, christmas, thanksgiving] = await Promise.all(events.map(event => Event.create(event)));
    // await kanye.addEvent(1, { through: { paid: true, attending: true, arrived: false } });
    await kanye.addEvent(christmas);
    await kanye.addEvent(thanksgiving);
    await kanye.addEvent(bday);
    await bruce.addEvent(bday);
    await lebron.addEvent(bday);
    await constance.addEvent(bday);
    await lex.addEvent(bday);
    console.log('db seeding complete!')
}

module.exports = {
    syncAndSeed
}