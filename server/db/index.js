const conn = require('./connection');
const { Event, User } = require('./models');

//associations
Event.belongsToMany(User, { through: 'scheduledEvents' });
User.belongsToMany(Event, { through: 'guestList' });

//sync with db
const sync = async () => {
  await conn.sync({ force: true })
  const joseph = await User.create({
    address: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    name: "Joseph",
    password: '1234567890',
    email: "jseph@email.com",
  });

  const kate = await User.create({
    address: '0xC3fh63dh6b81jA5357c5E395ab970B5B54098Fef',
    name: "Kate",
    password: '1234567890',
    email: "kdog@email.com",
  });

  const bday = await Event.create({
    title: 'Joes Birthday',
    address: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    stake: 2,
  });

  const pary = await Event.create({
    title: 'Loes Party',
    address: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    stake: 4,
  });

  joseph.addEvent(bday);
  bday.addUser(joseph);
}

module.exports = {
  sync
}