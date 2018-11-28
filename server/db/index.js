const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/flake-test')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Event = db.define('event', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    //this is ethereum address, not physical address
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //stake units are WEI (1 ETH === 1 * 1e10 WEI)
    stake: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

//should this just be named invite? -sw
const UserEvent = db.define('userevent', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    attending: {
        type: Sequelize.STRING
    },
    paid: {
        type: Sequelize.BOOLEAN
    },
    arrived: {
        type: Sequelize.STRING
    }
})

Event.belongsTo(User)

Event.belongsToMany(User, { through: 'invite' })
User.belongsToMany(Event, { through: 'invite' })

UserEvent.belongsTo(User)

const syncAndSeed = () => {
    db.sync({ force: true })
        .then(() => User.create({ email: 'kanye@test.com', name: 'Kanye West' }))
        .then(() => User.create({ email: 'bruce@test.com', name: 'Bruce Wayne' }))
        .then(() => User.create({ email: 'lebron@test.com', name: 'LeBron James' }))
        .then(() => User.create({ email: 'constance@test.com', name: 'Constance Wu' }))
        .then(() => User.create({ email: 'lex@test.com', name: 'Lex Bedwell' }))
        .then((res) => Event.create({ address: '0xa7e51530f4023f2f1aead1544cd06a172d8f1b1f', title: 'Nobody Wants to Go Here', description: 'This is not a very popular thing.', location: 'Who cares?', date: '2018-11-28 16:06:32.638 +00:00', stake: 200, userId: res.id }))
        .then(() => User.findByPk(5))
        .then((res) => res.addEvents(1, { through: { paid: true, attending: true, arrived: false } }))
        .then(() => Event.create({ address: '0xa7e51530f4023f2f1aead1544cd06a172d8f1b1f', title: 'The Place to Be', description: 'You know what it is.', location: 'The Usual Spot', date: '2018-11-28 16:06:32.638 +00:00', stake: 100, userId: 5 }))
        .then(() => User.findByPk(5))
        .then((res) => res.addEvents(1, { through: { attending: 'Yes', paid: true, arrived: 'No' } }))
        .then(() => console.log('db seeding complete!'))
}

module.exports = {
    models: {
        User,
        Event,
        UserEvent
    },
    syncAndSeed
}